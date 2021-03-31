import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ActivityIndicator,
  Linking,
} from 'react-native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import {version} from '../../services';

import {useAuth} from '../../hooks/auth';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

import logo from '../../assets/images/logo.png';

import {
  Container,
  Title,
  ModalContent,
  TextModal,
  Image,
  ImageContainer,
} from './styles';
import api from '../../services/api';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const [error, setError] = useState(false);

  const {signIn} = useAuth();
  const [modalVisible, setModalVisible] = useState(true);

  const handleButton = useCallback(
    async (data) => {
      setModalVisible(true);
      try {
        await signIn(data);
      } catch (err) {
        setModalVisible(false);
      }
    },
    [signIn],
  );

  const handleModal = useCallback((result: boolean) => {
    if (!result) {
      setModalVisible(false);
      setError(false);
      return;
    }

    Linking.openURL('http://api-home.ozcandy.com.br/download/tablet.apk');
  }, []);

  useEffect(() => {
    const get = async () => {
      try {
        const {data} = await api.get('/totem');

        setError(data?.version !== version);
        setModalVisible(data?.version !== version);
      } catch {
        // TODO
        setError(false);
        setModalVisible(false);
      }
    };

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Modal visible={modalVisible}>
        <ModalContent>
          {!error ? (
            <ActivityIndicator size={80} color="#f9a72b" />
          ) : (
            <>
              <TextModal>Atualize seu aplicativo.</TextModal>
              <TextModal>
                Não nos responsabilizamos caso continue usando uma versão
                diferente da mais recente.
              </TextModal>
              <Button onPress={() => handleModal(false)}>Cancelar</Button>
              <Button onPress={() => handleModal(true)}>Ok</Button>
            </>
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
            <ImageContainer>
              <Image source={logo} resizeMode="contain" />
            </ImageContainer>

            <Title>Faça seu login</Title>

            <Form
              ref={formRef}
              onSubmit={(data) => handleButton(data)}
              style={{width: '100%'}}>
              <Input
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCompleteType="email"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                keyboardType="default"
                autoCompleteType="password"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Login
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;
