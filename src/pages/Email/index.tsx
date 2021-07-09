import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/core';

import Header from '../../components/Header';
import Cart from '../../components/Cart';

import {useCart} from '../../hooks/cart';

import {
  Container,
  Content,
  Div,
  Margin,
  TextInput,
  Button,
  ButtonText,
  Text,
} from './styles';

const Email: React.FC = () => {
  const {info, setInfo} = useCart();
  const email = useRef('');
  const phone = useRef('');
  const [error, setError] = useState(false);
  const {navigate} = useNavigation();

  const handle = () => {
    if (
      !phone.current ||
      phone.current.length < 8 ||
      phone.current.length > 11
    ) {
      setError(true);
      return;
    }
    setError(false);
    setInfo({...info, email: email.current, phone: phone.current});
    navigate('Note');
  };

  return (
    <>
      <Container>
        <Header text="Informações para compra" goBack />
        <Content>
          <Div>
            <TextInput
              placeholder="Celular"
              keyboardType="phone-pad"
              onChangeText={(e) => (phone.current = e)}
            />
            <Text>{error ? 'Informe um celular válido' : ''}</Text>
            <Margin />
            <TextInput
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={(e) => (email.current = e)}
            />
          </Div>
          <Button onPress={handle}>
            <ButtonText>Próximo</ButtonText>
          </Button>
        </Content>
      </Container>
      <Cart noClick />
    </>
  );
};

export default Email;
