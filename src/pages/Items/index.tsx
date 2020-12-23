import React, {useEffect} from 'react';
import {FlatList} from 'react-native';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Item from '../../components/Item';
import Main from '../../components/Main';
import Cart from '../../components/Cart';

import {useInventory} from '../../hooks/inventory';
import {useCart} from '../../hooks/cart';

import {Container, Content} from './styles';

const Items: React.FC = () => {
  const {selectedSub, products, getInventory} = useInventory();
  const {cart} = useCart();

  useEffect(() => {
    const get = async () => {
      await getInventory(cart);
    };

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Cart />
      <Content>
        <Main>
          <Header />
          <FlatList
            data={products.filter((item) => item.pos_categ_id === selectedSub)}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({item}) => <Item item={item} />}
          />
        </Main>
        <Footer />
      </Content>
    </Container>
  );
};

export default Items;
