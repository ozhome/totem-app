import React, {useCallback} from 'react';
import Icon from 'react-native-vector-icons/Feather';

import {Product, useInventory} from '../../hooks/inventory';
import {useCart} from '../../hooks/cart';

import {Container, ContainerItem, Button, Text, Title} from './style';

interface ItemListProps {
  item: Product;
}

const ItemList: React.FC<ItemListProps> = ({item}) => {
  const {plusCart, minusCart} = useCart();
  const {updateInventory} = useInventory();

  const handlePlus = useCallback(() => {
    if (item.quantity + 1 <= item.qty_available) {
      const res = plusCart(item);
      updateInventory(res);
    }
  }, [item, plusCart, updateInventory]);

  const handleMinus = useCallback(() => {
    if (item.quantity) {
      const res = minusCart(item);
      updateInventory(res);
    }
  }, [item, minusCart, updateInventory]);

  return (
    <Container>
      <Title>{item.name}</Title>
      <ContainerItem>
        <Button onPress={handleMinus}>
          <Icon name="minus-circle" size={40} color="#000" />
        </Button>
        <Text>{item.quantity}</Text>
        <Button onPress={handlePlus}>
          <Icon name="plus-circle" size={40} color="#000" />
        </Button>
      </ContainerItem>
    </Container>
  );
};

export default ItemList;
