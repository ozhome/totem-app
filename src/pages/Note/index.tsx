import React, {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/core';

import Header from '../../components/Header';
import Cart from '../../components/Cart';

import {useCart} from '../../hooks/cart';

import {Container, Content, Div, TextInput, Button, ButtonText} from './styles';

const Note: React.FC = () => {
  const {note, setNote} = useCart();
  const [data, setData] = useState(note);
  const {navigate} = useNavigation();

  const handle = useCallback(() => {
    setNote(data);
    navigate('Discount');
  }, [data, navigate, setNote]);

  return (
    <>
      <Container>
        <Header text="Observação no pedido" goBack />
        <Content>
          <Div>
            <TextInput
              value={data}
              placeholder="Observação para entrega ou retirada"
              onChangeText={(e) => setData(e)}
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

export default Note;
