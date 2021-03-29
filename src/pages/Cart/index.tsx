import React, {useCallback, useState} from 'react';
import {FlatList} from 'react-native';

import Header from '../../components/Header';
import Item from '../../components/Item';
import Footer from '../../components/Cart';
import ModalInput from '../../components/ModalInput';

import {Product} from '../../hooks/inventory';
import {useCart} from '../../hooks/cart';

import {Container, Content} from './styles';

const Cart: React.FC = () => {
  const {cart} = useCart();
  const [modalInput, setModalInput] = useState(false);
  const [item, setItem] = useState<Product>({} as Product);

  const openModal = useCallback((data: Product) => {
    setItem(data);
    setModalInput(true);
  }, []);

  return (
    <>
      <ModalInput visible={modalInput} item={item} close={setModalInput} />
      <Footer showButtons />
      <Container>
        <Content>
          <Header text='Clique em "Finalizar Compra" para concluir' goBack />
          <FlatList
            data={cart}
            keyExtractor={(item) => `${item.id}`}
            horizontal
            renderItem={({item}) => <Item item={item} openModal={openModal} />}
          />
        </Content>
      </Container>
    </>
  );
};

export default Cart;
