import React, {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/core';

import Header from '../../components/Header';
import Modal from '../../components/Modal';
import Cart from '../../components/Cart';

import {useCart} from '../../hooks/cart';
import {useAuth} from '../../hooks/auth';
import {Product} from '../../hooks/inventory';

import api from '../../services/api';

import {
  Container,
  Content,
  Div,
  Text,
  TextInput,
  Button,
  ButtonText,
  ContainerButton,
} from './styles';

const Discount: React.FC = () => {
  const {cart, aplyDiscount} = useCart();
  const {store} = useAuth();
  const [discount, setDiscount] = useState('');
  const [error, setError] = useState('');
  const [modal, setModal] = useState(false);
  const {navigate} = useNavigation();

  const handle = useCallback(async () => {
    try {
      if (!discount) {
        return;
      }
      setModal(true);

      const {data} = await api.get(
        `/discounts/code/${encodeURI(discount)}/${store?.store}`,
      );

      if (data.status !== 'active') {
        setError('Cupom inválido');
        return;
      }

      let activeDiscount = false;
      let items: Product[];
      if (data.type === 'category') {
        items = cart.map((item) => {
          if (data.ids.includes(item.pos_categ_id)) {
            activeDiscount = true;
            return {...item, discount: data.percentage};
          }
          return {...item, discount: 0};
        });
      } else {
        items = cart.map((item) => {
          if (data.ids.includes(item.idOdoo)) {
            activeDiscount = true;
            return {...item, discount: data.percentage};
          }
          return {...item, discount: 0};
        });
      }

      if (activeDiscount) {
        aplyDiscount(items, data.code);
        setError(`Cupom de ${data.percentage}% aplicado.`);
      } else {
        setError('Sem itens para aplicar o cupom.');
      }
    } catch (e) {
      setError('Cupom inválido');
    } finally {
      setModal(false);
    }
  }, [aplyDiscount, cart, discount, store?.store]);

  const next = useCallback(() => {
    navigate('Card');
  }, [navigate]);

  return (
    <>
      <Modal visible={modal} />
      <Container>
        <Header text="Cupom" goBack />
        <Content>
          <Div>
            <TextInput
              value={discount}
              placeholder="Cupom"
              onChangeText={(e) => setDiscount(e)}
            />
            <Text>{error}</Text>
          </Div>
          <ContainerButton>
            <Button onPress={handle}>
              <ButtonText>Aplicar cupom</ButtonText>
            </Button>
            <Button onPress={next}>
              <ButtonText>Próximo</ButtonText>
            </Button>
          </ContainerButton>
        </Content>
      </Container>
      <Cart noClick />
    </>
  );
};

export default Discount;
