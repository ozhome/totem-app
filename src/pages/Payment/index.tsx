import React, {useCallback, useEffect, useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';

import {useCart} from '../../hooks/cart';
import {useAuth} from '../../hooks/auth';
import {useIzettle, PaymentResponse} from '../../hooks/izettle';

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
  const {payment, refund} = useIzettle();
  const {navigate} = useNavigation();
  const hash = useRef('');

  const [typeCard, setTypeCard] = useState<'credit' | 'debit' | 'amount' | ''>(
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

    if (cpf.length !== 14 && cpf.length > 0) {
      setModalText('Por favor preencha o campo CPF.');
      setPaymentCompleted(true);
      setPaymentError(true);
      return;
    }

    if (cpf.length === 14 && email === '') {
      setModalText('Por favor preencha o campo e-mail para ser enviado a NFC.');
      setPaymentCompleted(true);
      setPaymentError(true);
      return;
    }

    try {
      const products = cart.map((item) => {
        return {
          id: item.id,
          qty: item.quantity,
          price: item.price,
        };
      });

      setModalText('Realize o pagamento na maquina de cartão.');

      if (typeCard !== 'amount') {
        const response = await payment(amount);
        setModalText('Pagamento aprovado., emitindo NFC');
        hash.current = response.hash;
      }

      setModalText('Emitindo NFC');

      const body = {
        store: store.companyId,
        amount,
        products,
        shipping: false,
        manager: store.id,
        name,
        cpf: cpf.replace(/\D/g, ''),
        email,
        callbackId: store.id,
        card: typeCard === 'amount' ? 'debit' : typeCard,
        idIzettle: hash.current,
      };

      await api.post('/orders/create', body);
    } catch (err) {
      if (hash.current !== 'null') {
        setModalText('Erro, processando estorno');
        await refund(hash.current);
        setPaymentCompleted(true);
        setPaymentError(true);
      } else {
        setModalText('Erro ao fazer o pagamento');
        setPaymentCompleted(true);
        setPaymentError(true);
      }
    }
  }, [amount, cart, cpf, email, name, payment, refund, store, typeCard]);

  const checkOrder = useCallback(
    async (status: 'success' | 'error') => {
      if (status === 'success') {
        if (typeCard === 'amount') {
          setModalText('Por favor finalize seu pedido no balcão.');
        } else {
          setModalText('Compra aprovada, retire seu pedido no balcão.');
        }
        setPaymentCompleted(true);
      } else {
        setModalText('Erro ao emitir NFC, realizando estorno.');
        await refund(hash.current);
        setPaymentCompleted(true);
        setPaymentError(true);
      }
    },
    [refund, typeCard],
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
                    {backgroundColor: '#fff', color: '#000'},
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
                    typeCard === 'amount' && {
                      backgroundColor: '#000',
                      color: '#fff',
                    },
                  ]}
                  onPress={() => setTypeCard('amount')}>
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

          {cpf.length === 14 && (
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
