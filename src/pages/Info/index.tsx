import React, {useCallback, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput as ITextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {validate} from 'gerador-validador-cpf';

import Header from '../../components/Header';
import Cart from '../../components/Cart';

import {IInfo, useCart} from '../../hooks/cart';
import {cpfMask} from '../../utils/cpfMask';

import {
  Container,
  Content,
  Div,
  Text,
  TextInput,
  Button,
  ButtonText,
  Row,
  Form,
} from './styles';
import {phoneMask} from '../../utils/phoneMask';

const Info: React.FC = () => {
  const {setInfo} = useCart();
  const cpfRef = useRef<ITextInput>(null);
  const emailRef = useRef<ITextInput>(null);
  const phoneRef = useRef<ITextInput>(null);

  const [infoPage, setInfoPage] = useState<IInfo>({
    cpf: '',
    email: '',
    name: '',
    phone: '',
  });
  const [error, setError] = useState<IInfo>({
    cpf: '',
    email: '',
    name: '',
    phone: '',
  });
  const {navigate} = useNavigation();

  const handle = useCallback(() => {
    let errorCurrent: IInfo = {
      cpf: '',
      email: '',
      name: '',
      phone: '',
    };
    if (infoPage.cpf.length > 0 && !validate(infoPage.cpf)) {
      errorCurrent.cpf = 'CPF inválido';
    }
    if (infoPage.email.length && infoPage.email.length <= 4) {
      errorCurrent.email = 'Informe um e-mail.';
    }
    if (
      infoPage.phone.length &&
      (infoPage.phone.length < 14 || infoPage.phone.length > 16)
    ) {
      errorCurrent.phone = 'Informe um celular válido.';
    }
    if (!infoPage.name) {
      errorCurrent.name = 'Informe um nome.';
    }
    setError(errorCurrent);

    if (
      errorCurrent.cpf ||
      errorCurrent.name ||
      errorCurrent.phone ||
      errorCurrent.email
    ) {
      return;
    }

    setInfo(infoPage);
    navigate('Card');
  }, [navigate, setInfo, infoPage]);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flexGrow: 1, paddingBottom: 10}}>
        <Container>
          <Header text="CPF na nota" goBack />
          <Content>
            <Form>
              <Row>
                <Div>
                  <TextInput
                    value={infoPage.name}
                    placeholder="Nome completo"
                    onChangeText={(e) =>
                      setInfoPage((state) => ({...state, name: e}))
                    }
                    onSubmitEditing={() => cpfRef.current?.focus()}
                    returnKeyType="next"
                  />
                  <Text>{error.name}</Text>
                </Div>
                <Div>
                  <TextInput
                    ref={cpfRef}
                    value={infoPage.cpf}
                    placeholder="CPF (opcional)"
                    keyboardType="numeric"
                    onChangeText={(e) =>
                      setInfoPage((state) => ({...state, cpf: cpfMask(e)}))
                    }
                    onSubmitEditing={() => emailRef.current?.focus()}
                    returnKeyType="next"
                  />
                  <Text>{error.cpf}</Text>
                </Div>
              </Row>
              <Row>
                <Div>
                  <TextInput
                    ref={emailRef}
                    value={infoPage.email}
                    placeholder="E-mail (opcional)"
                    keyboardType="email-address"
                    onChangeText={(e) =>
                      setInfoPage((state) => ({...state, email: e}))
                    }
                    onSubmitEditing={() => phoneRef.current?.focus()}
                    returnKeyType="next"
                  />
                  <Text>{error.email}</Text>
                </Div>
                <Div>
                  <TextInput
                    ref={phoneRef}
                    value={infoPage.phone}
                    placeholder="Celular (opcional)"
                    keyboardType="phone-pad"
                    onChangeText={(e) =>
                      setInfoPage((state) => ({
                        ...state,
                        phone: phoneMask(e),
                      }))
                    }
                    onSubmitEditing={handle}
                  />
                  <Text>{error.phone}</Text>
                </Div>
              </Row>
            </Form>
            <Button onPress={handle}>
              <ButtonText>Próximo</ButtonText>
            </Button>
          </Content>
        </Container>
        <Cart noClick />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Info;
