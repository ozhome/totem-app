import React, {useEffect} from 'react';
import {FlatList} from 'react-native';

import Category from '../../components/Category';
import Header from '../../components/Header';
import Cart from '../../components/Cart';

import {useInventory} from '../../hooks/inventory';

import {Container, Content} from './styles';

const Home: React.FC = () => {
  const {categories, getCategories} = useInventory();

  useEffect(() => {
    const get = async () => {
      await getCategories();
    };
    get();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Cart />
      <Container>
        <Content>
          <Header text="Selecione uma categoria" />
          <FlatList
            data={categories.filter((ca) => !ca.parent_id)}
            keyExtractor={(item) => item.id}
            numColumns={3}
            renderItem={({item}) => (
              <Category image={item.image} name={item.name} id={item.idOdoo} />
            )}
          />
        </Content>
      </Container>
    </>
  );
};

export default Home;
