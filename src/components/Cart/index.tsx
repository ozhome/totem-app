import {useNavigation} from '@react-navigation/core';
import React, {useCallback} from 'react';
import IconFeather from 'react-native-vector-icons/Feather';

import {useCart} from '../../hooks/cart';

import FormatReal from '../../utils/formartReal';

import {Container, Content, Text} from './styles';

interface CartProps {
  showButtons?: boolean;
  noClick?: boolean;
}

const Cart: React.FC<CartProps> = ({showButtons, noClick}) => {
  const {amount, cart} = useCart();
  const {navigate} = useNavigation();

  const handleCart = useCallback(() => {
    if (noClick) {
      return;
    }
    if (showButtons) {
      navigate('Info');
    } else {
      navigate('Cart');
    }
  }, [navigate, noClick, showButtons]);

  if (!cart.length) {
    return <></>;
  }

  return (
    <Container>
      <Content onPress={handleCart}>
        <IconFeather name="shopping-bag" size={40} color="#000" />

        {!noClick && (
          <Text>{showButtons ? 'Finalizar compra' : 'Ver Sacola'}</Text>
        )}

        <Text>{`R$ ${FormatReal(amount)}`}</Text>
      </Content>
    </Container>
  );
};

export default Cart;
