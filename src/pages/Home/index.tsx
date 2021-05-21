import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';

import Category from '../../components/Category';
import Header from '../../components/Header';
import Cart from '../../components/Cart';

import {Category as ICategory, useInventory} from '../../hooks/inventory';

import {Container, Content} from './styles';

const Home: React.FC = () => {
  const {categories, getCategories} = useInventory();

  const [data, setData] = useState<ICategory[]>(() => {
    return [
      {id: '', idOdoo: 0, image: 'https://i.imgur.com/AD3MbBi.jpeg', name: ''},
      ...categories.filter((ca) => !ca.parent_id),
    ];
  });

  useEffect(() => {
    const get = async () => {
      await getCategories();
    };
    get();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setData([
      {id: '', idOdoo: 0, image: 'https://i.imgur.com/AD3MbBi.jpeg', name: ''},
      ...categories.filter((ca) => !ca.parent_id),
    ]);
  }, [categories]);

  return (
    <>
      <Cart />
      <Container>
        <Content>
          <Header text="Selecione uma categoria" />
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({item, index}) => (
              <Category
                first={!index}
                image={item.image}
                name={item.name}
                id={item.idOdoo}
              />
            )}
          />
        </Content>
      </Container>
    </>
  );
};

export default Home;
