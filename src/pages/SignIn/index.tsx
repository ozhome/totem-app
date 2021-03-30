import React, {useCallback, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import {useAuth} from '../../hooks/auth';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

import logo from '../../assets/images/logo.png';

import {Container, Title} from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const {signIn} = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

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
  return (
    <>
      <Modal visible={modalVisible} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flexGrow: 1, paddingBottom: 10}}>
          <Container>
            <Image source={logo} />

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
