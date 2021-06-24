import React, {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {validate} from 'gerador-validador-cpf';

import Header from '../../components/Header';
import Cart from '../../components/Cart';

import {useCart} from '../../hooks/cart';
import {cpfMask} from '../../utils/cpfMask';

import {
  Container,
  Content,
  Div,
  Text,
  TextInput,
  Button,
  ButtonText,
} from './styles';

const Cpf: React.FC = () => {
  const {info, setInfo} = useCart();
  const [cpf, setCpf] = useState('');
  const [error, setError] = useState(false);
  const {navigate} = useNavigation();

  const handle = useCallback(() => {
    if (!validate(cpf) && cpf.length !== 0) {
      setError(true);
      return;
    }
    if (cpf) {
      setInfo({...info, cpf});
      navigate('Email');
    } else {
      setInfo({...info, cpf});
      navigate('Note');
    }
  }, [cpf, info, navigate, setInfo]);

  return (
    <>
      <Container>
        <Header text="CPF na nota" goBack />
        <Content>
          <Div>
            <TextInput
              value={cpf}
              placeholder="CPF"
              keyboardType="numeric"
              onChangeText={(e) => setCpf(cpfMask(e))}
            />
            <Text>{error ? 'Informe um CPF válido' : ''}</Text>
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

export default Cpf;
