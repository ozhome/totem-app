import React, {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/core';

import Header from '../../components/Header';
import Cart from '../../components/Cart';

import {useCart} from '../../hooks/cart';

import {Container, Content, Div, TextInput, Button, ButtonText} from './styles';

const Email: React.FC = () => {
  const {info, setInfo} = useCart();
  const [email, setEmail] = useState('');
  const {navigate} = useNavigation();

  const handle = useCallback(() => {
    setInfo({...info, email});
    navigate('Discount');
  }, [email, info, navigate, setInfo]);

  return (
    <>
      <Container>
        <Header text="E-mail para envio da nota" goBack />
        <Content>
          <Div>
            <TextInput
              value={email}
              placeholder="E-mail (opcional)"
              keyboardType="email-address"
              onChangeText={(e) => setEmail(e)}
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
