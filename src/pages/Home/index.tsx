import React, {useEffect} from 'react';
import {FlatList} from 'react-native';

import Header from '../../components/Header';
import Main from '../../components/Main';
import Category from '../../components/Category';
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
    <Container>
      <Cart />
      <Content>
        <Main show>
          <Header isHome />
          <FlatList
            data={categories.filter((ca) => !ca.parent_id)}
            keyExtractor={(item) => `${item.id}`}
            numColumns={2}
            renderItem={({item}) => (
              <Category image={item.image} name={item.name} id={item.idOdoo} />
            )}
          />
        </Main>
      </Content>
    </Container>
  );
};

export default Home;
