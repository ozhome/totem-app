import React, {useCallback} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import {useCart} from '../../hooks/cart';
import {useInventory} from '../../hooks/inventory';

import logo from '../../assets/images/logo.png';

import {Container, Image, Title, TitleText, TitleTexSub} from './styles';

const Touch: React.FC = () => {
  const {navigate} = useNavigation();
  const {clearCart} = useCart();
  const {clearInventory} = useInventory();

  useFocusEffect(
    useCallback(() => {
      const clear = () => {
        clearCart();
        clearInventory();
      };

      return () => clear();
    }, [clearCart, clearInventory]),
  );

  return (
    <Container onPress={() => navigate('Home')}>
      <Title>
        <TitleText>Bem vindo a Oz</TitleText>
        <TitleTexSub>Toque na tela para fazer seu pedido</TitleTexSub>
      </Title>
      <Image source={logo} resizeMode="contain" />
    </Container>
  );
};

export default Touch;
