import {useNavigation} from '@react-navigation/core';
import React, {useCallback, useState} from 'react';

import Header from '../../components/Header';
import {useCart} from '../../hooks/cart';

import {
  Container,
  Content,
  Div,
  Text,
  TextInput,
  Button,
  ButtonText,
} from './styles';

const Name: React.FC = () => {
  const {info, setInfo} = useCart();
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const {navigate} = useNavigation();

  const handle = useCallback(() => {
    if (name) {
      setError(false);
      setInfo({...info, name});
      navigate('Cpf');
    } else {
      setError(true);
    }
  }, [info, name, navigate, setInfo]);

  return (
    <Container>
      <Header text="Informe seu nome" goBack />
      <Content>
        <Div>
          <TextInput
            value={name}
            placeholder="Nome"
            onChangeText={(e) => setName(e)}
          />
          <Text>{error ? 'Informe um nome' : ''}</Text>
        </Div>
        <Button onPress={handle}>
          <ButtonText>Próximo</ButtonText>
        </Button>
      </Content>
    </Container>
  );
};

export default Name;
