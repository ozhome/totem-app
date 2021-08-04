import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import Header from '../../components/Header';
import Modal from '../../components/Modal';
import Cart from '../../components/Cart';

import {useCart} from '../../hooks/cart';
import {useAuth} from '../../hooks/auth';
import {useIzettle} from '../../hooks/izettle';

import api from '../../services/api';
import socket from '../../services/socket';

import {
  Container,
  Content,
  Div,
  Text,
  Button,
  ButtonText,
  TextModal,
  ModalContent,
  ContainerButton,
  TextDiscount,
} from './styles';

const Cpf: React.FC = () => {
  const {store} = useAuth();
  const {cart, discount, amount, note, clearCart, info, setInfo} = useCart();
  const {payment} = useIzettle();
  const {navigate} = useNavigation();
  const hash = useRef('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentError, setPaymentError] = useState(false);

  const [card, setCard] = useState<'credit' | 'debit' | 'cash' | ''>('');
  const [error, setError] = useState(false);

  const handleFinish = async () => {
    if (paymentError) {
      setModalVisible(false);
    } else {
      clearCart();
      setInfo({cpf: '', email: '', name: '', phone: ''});
      navigate('Touch');
    }
  };

  const handleDiscount = useCallback(() => {
    navigate('Discount');
  }, [navigate]);

  const handlePayment = useCallback(async () => {
    setModalText('');
    setModalVisible(true);
    setPaymentCompleted(false);
    setPaymentError(false);
    hash.current = 'null';

    try {
      const products = cart.map((item) => {
        return {
          id: item.idOdoo,
          qty: item.quantity,
          price: item.price,
          discount: item.discount,
          to_weight: item.to_weight,
          name: item.name,
        };
      });

      if (card !== 'cash') {
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
        card: card,
        idTotem: hash.current,
        name: info.name,
        cpf: info.cpf,
        email: info.email,
        phone: info.phone,
        shipping: false,
        discount,
        note,
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
  }, [
    amount,
    card,
    cart,
    discount,
    info,
    note,
    payment,
    store.companyId,
    store.id,
  ]);

  const checkOrder = useCallback(
    async (status: 'success' | 'error') => {
      if (status === 'success') {
        if (card === 'cash') {
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
    [card],
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

  const handle = () => {
    if (card === '') {
      setError(true);
      return;
    } else {
      handlePayment();
    }
  };

  return (
    <>
      <Modal visible={modalVisible}>
        <ModalContent>
          {!paymentCompleted && <ActivityIndicator size={80} color="#f9a72b" />}
          <TextModal>{modalText}</TextModal>
          {paymentCompleted && (
            <Button onPress={handleFinish}>
              <ButtonText>Ok</ButtonText>
            </Button>
          )}
        </ModalContent>
      </Modal>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flexGrow: 1, paddingBottom: 10}}>
          <Container>
            <Header text="Forma de pagamento" goBack />
            <Content>
              <Div>
                <Button
                  custom
                  select={card === 'cash'}
                  onPress={() => setCard('cash')}>
                  <ButtonText>Dinheiro</ButtonText>
                </Button>
                <Button
                  custom
                  select={card === 'credit'}
                  onPress={() => setCard('credit')}>
                  <ButtonText>Cartão de crédito</ButtonText>
                </Button>
                <Button
                  custom
                  select={card === 'debit'}
                  onPress={() => setCard('debit')}>
                  <ButtonText>Cartão de debito</ButtonText>
                </Button>
                <Text>{error ? 'Selecione a forma de pagamento' : ''}</Text>
              </Div>
              <ContainerButton>
                <Div>
                  <Button onPress={handleDiscount}>
                    <ButtonText>Adicionar cupom</ButtonText>
                  </Button>
                  <TextDiscount>
                    {discount ? `Cupom "${discount}" aplicado.` : ''}
                  </TextDiscount>
                </Div>
                <Button onPress={handle}>
                  <ButtonText>Finalizar pagamento</ButtonText>
                </Button>
              </ContainerButton>
            </Content>
          </Container>
          <Cart noClick />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Cpf;
