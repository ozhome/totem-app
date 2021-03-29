import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';

import {useIzettle} from '../../hooks/izettle';

import Button from '../../components/Button';
import Modal from '../../components/Modal';

import {Container, Title, Text, TextAtt} from './styles';

const Izettle: React.FC = () => {
  const [modal, setModal] = useState(false);
  const {connect, login, totem, checkLogin} = useIzettle();

  const openLogin = async () => {
    setModal(true);
    await login();
  };

  const openSettings = async () => {
    setModal(true);
    await connect();
    setModal(false);
  };

  const openFinish = async () => {
    setModal(true);
    await totem();
    setModal(false);
  };

  useEffect(() => {
    setModal(checkLogin);
  }, [checkLogin]);
  return (
    <>
      <Modal visible={modal} />
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 10}}>
        <Container>
          <Title>Bem vindo ao Oz Totem.</Title>

          <Text>
            Configure sua máquina da Izettle, necessário fazer isso apenas uma
            vez.
          </Text>

          <Button onPress={openLogin}>1- Login Izettle</Button>
          <Button onPress={openSettings}>2- Conexão máquina</Button>

          <Text>
            Agora só fazer o login no totem, necessário fazer isso todo os dias.
          </Text>

          <TextAtt>
            ATENÇÃO: Para voltar a essa tela é necessário apagar os dados de
            memoria do App.
          </TextAtt>
          <Button onPress={openFinish}>3- Iniciar Totem</Button>
        </Container>
      </ScrollView>
    </>
  );
};

export default Izettle;
