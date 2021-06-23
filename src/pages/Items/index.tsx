import React, {useCallback, useState} from 'react';
import {FlatList} from 'react-native';

import Header from '../../components/Header';
import Item from '../../components/Item';
import Cart from '../../components/Cart';
import ModalInput from '../../components/ModalInput';

import {Product, useInventory} from '../../hooks/inventory';

import {Container, Content} from './styles';

const Items: React.FC = () => {
  const {selectedSub, products} = useInventory();
  const [modalInput, setModalInput] = useState(false);
  const [itemModal, setItem] = useState<Product>({} as Product);

  const openModal = useCallback((data: Product) => {
    setItem(data);
    setModalInput(true);
  }, []);

  return (
    <>
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
