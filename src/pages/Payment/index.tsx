/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {validate} from 'gerador-validador-cpf';

import {useCart} from '../../hooks/cart';
import {useAuth} from '../../hooks/auth';
import {useIzettle} from '../../hooks/izettle';

import api from '../../services/api';
import socket from '../../services/socket';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Main from '../../components/Main';
import Cart from '../../components/Cart';
import Modal from '../../components/Modal';

import {cpfMask} from '../../utils/cpfMask';

import {
  Container,
  Content,
  Text,
  Cards,
  CardButton,
  InfoCard,
  Name,
  Finish,
  ModalContent,
  Input,
} from './styles';

const Payment: React.FC = () => {
  const {store} = useAuth();
  const {cart, amount, clearCart} = useCart();
  const {payment} = useIzettle();
  const {navigate} = useNavigation();
  const hash = useRef('');

  const [typeCard, setTypeCard] = useState<'credit' | 'debit' | 'cash' | ''>(
    '',
  );
  const [name, setName] = useState('');
  const [cpf, setCPF] = useState('');
  const [email, setEmail] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentError, setPaymentError] = useState(false);

  const handleFinish = useCallback(async () => {
    if (paymentError) {
      setModalVisible(false);
    } else {
      clearCart();
      navigate('Home');
    }
  }, [clearCart, navigate, paymentError]);

  const handlePayment = useCallback(async () => {
    setModalText('');
    setModalVisible(true);
    setPaymentCompleted(false);
    setPaymentError(false);
    hash.current = 'null';

    if (typeCard === '' || name === '') {
      setModalText('Por favor selecione o tipo de cartão e preencha seu nome.');
      setPaymentCompleted(true);
      setPaymentError(true);
      return;
    }

    if (!validate(cpf) && cpf.length !== 0) {
      setModalText('Por favor informe um CPF válido.');
      setPaymentCompleted(true);
      setPaymentError(true);
      return;
    }

    if (!cart.length) {
      setModalText(
        'Por adicione items ao seu carrinho para realizar uma compra.',
      );
      setPaymentCompleted(true);
      setPaymentError(true);
      return;
    }

    try {
      const products = cart.map((item) => {
        return {
          id: item.idOdoo,
          qty: item.quantity,
          price: item.price,
          discount: 0,
        };
      });

      if (typeCard !== 'cash') {
        setModalText('Realize o pagamento na maquina de cartão.');
        const response = await payment(amount);
        setModalText('Pagamento aprovado, emitindo NFC');
        hash.current = response.hash;
      }

      setModalText('Emitindo NFC');

      const body = {
        amount,
        store: store.companyId,
        products,
        callbackId: store.id,
        card: typeCard,
        idTotem: hash.current,
        name,
        cpf,
        email,
        shipping: false,
      };

      await api.post('/orders/create', body);
    } catch (err) {
      if (hash.current !== 'null') {
        setModalText('Erro, processando estorno');
        setModalText(
          'Erro ao processar a compra, por favor fale com o lojista.',
        );
        setPaymentCompleted(true);
        setPaymentError(true);
      } else {
        setModalText('Erro ao fazer o pagamento');
        setPaymentCompleted(true);
        setPaymentError(true);
      }
    }
  }, [amount, cart, cpf, email, name, payment, store, typeCard]);

  const checkOrder = useCallback(
    async (status: 'success' | 'error') => {
      if (status === 'success') {
        if (typeCard === 'cash') {
          setModalText('Por favor finalize seu pedido no balcão.');
        } else {
          setModalText('Compra aprovada, retire seu pedido no balcão.');
        }
        setPaymentCompleted(true);
      } else {
        setModalText(
          'Erro ao processar a compra, por favor fale com o lojista.',
        );
        setPaymentCompleted(true);
        setPaymentError(true);
      }
    },
    [typeCard],
  );

  useEffect((): any => {
    const handleOrder = (newOrder: any) => {
      if (newOrder.callbackId === store.id) {
        checkOrder(newOrder.status);
      }
    };
    socket.on('order-create', handleOrder);
    return () => socket.off('order-create', handleOrder);
  }, [store, checkOrder]);

  useEffect(() => {
    if (!cart.length) {
      navigate('Home');
    }
  }, [cart.length, navigate]);

  return (
    <Container>
      <Modal visible={modalVisible}>
        <ModalContent>
          <Text>{modalText}</Text>
          {paymentCompleted && <Button onPress={handleFinish}>Ok</Button>}
        </ModalContent>
      </Modal>

      <Cart showButtons={false} />
      <Content>
        <Main>
          <Header isHome />

          <InfoCard>
            <Text>Forma de pagamento</Text>

            <Cards>
              <CardButton>
                <Button
                  style={[
                    {
                      backgroundColor: '#fff',
                      color: '#000',
                    },
                    typeCard === 'credit' && {
                      backgroundColor: '#000',
                      color: '#fff',
                    },
                  ]}
                  onPress={() => setTypeCard('credit')}>
                  Credito
                </Button>
              </CardButton>
              <CardButton>
                <Button
                  style={[
                    {backgroundColor: '#fff', color: '#000'},
                    typeCard === 'debit' && {
                      backgroundColor: '#000',
                      color: '#fff',
                    },
                  ]}
                  onPress={() => setTypeCard('debit')}>
                  Debito
                </Button>
              </CardButton>
              <CardButton>
                <Button
                  style={[
                    {backgroundColor: '#fff', color: '#000'},
                    typeCard === 'cash' && {
                      backgroundColor: '#000',
                      color: '#fff',
                    },
                  ]}
                  onPress={() => setTypeCard('cash')}>
                  Dinheiro
                </Button>
              </CardButton>
            </Cards>
          </InfoCard>

          <Name>
            <Text>Seu nome</Text>
            <Input
              placeholder="Digite seu nome aqui"
              value={name}
              onChangeText={(e) => setName(e)}
            />
          </Name>

          <Name>
            <Text>CPF na nota?</Text>
            <Input
              placeholder="Digite seu CPF aqui"
              value={cpf}
              onChangeText={(e) => setCPF(cpfMask(e))}
            />
          </Name>

          {validate(cpf) && (
            <Name>
              <Text>Email</Text>
              <Input
                placeholder="Digite seu email aqui"
                value={email}
                onChangeText={(e) => setEmail(e)}
              />
            </Name>
          )}
        </Main>
        <Finish>
          <Button onPress={handlePayment}>Finalizar compra</Button>
        </Finish>
        <Footer />
      </Content>
    </Container>
  );
};

export default Payment;
