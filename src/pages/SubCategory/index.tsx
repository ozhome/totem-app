import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';

import Category from '../../components/Category';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import Cart from '../../components/Cart';

import {Category as ICategory, useInventory} from '../../hooks/inventory';
import {useCart} from '../../hooks/cart';

import {Container, Content} from './styles';

const SubCategory: React.FC = () => {
  const {categories, selectedCateg, getInventory} = useInventory();
  const {cart} = useCart();
  const [modal, setModal] = useState(true);

  const [data, setData] = useState<ICategory[]>(
    categories.filter((ca) => ca.parent_id === selectedCateg && ca.has_product),
  );

  useEffect(() => {
    const get = async () => {
      await getInventory(cart);
      setModal(false);
    };

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setData(
      categories.filter(
        (ca) => ca.parent_id === selectedCateg && ca.has_product,
      ),
    );
  }, [categories, selectedCateg]);

  return (
    <>
      <Modal visible={modal} />
      <Cart />
      <Container>
        <Content>
          <Header text="Selecione uma categoria" />
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({item}) => (
              <Category
                first={false}
                image={item.image}
                name={item.name}
                id={item.idOdoo}
                isCategory={false}
              />
            )}
          />
        </Content>
      </Container>
    </>
  );
};

export default SubCategory;
