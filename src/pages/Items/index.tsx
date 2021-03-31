import React, {useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';

import Header from '../../components/Header';
import Item from '../../components/Item';
import Cart from '../../components/Cart';
import Modal from '../../components/Modal';
import ModalInput from '../../components/ModalInput';

import {Product, useInventory} from '../../hooks/inventory';
import {useCart} from '../../hooks/cart';

import {Container, Content} from './styles';

const Items: React.FC = () => {
  const {selectedSub, products, getInventory} = useInventory();
  const {cart} = useCart();
  const [modal, setModal] = useState(true);
  const [modalInput, setModalInput] = useState(false);
  const [itemModal, setItem] = useState<Product>({} as Product);

  useEffect(() => {
    const get = async () => {
      await getInventory(cart);
      setModal(false);
    };

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = useCallback((data: Product) => {
    setItem(data);
    setModalInput(true);
  }, []);

  return (
    <>
      <Modal visible={modal} />
      <ModalInput visible={modalInput} item={itemModal} close={setModalInput} />
      <Cart />
      <Container>
        <Content>
          <Header text="Adicione os itens ao carrinho" goBack showCategories />
          <FlatList
            data={products.filter((item) => item.pos_categ_id === selectedSub)}
            keyExtractor={(item) => `${item.id}`}
            horizontal
            renderItem={({item}) => <Item item={item} openModal={openModal} />}
          />
        </Content>
      </Container>
    </>
  );
};

export default Items;
