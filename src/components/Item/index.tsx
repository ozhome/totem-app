import React, {useCallback} from 'react';
import Icon from 'react-native-vector-icons/Feather';

import {Product, useInventory} from '../../hooks/inventory';
import {useCart} from '../../hooks/cart';

import formatReal from '../../utils/formartReal';

import {
  Container,
  Description,
  ImageContainer,
  Info,
  ContainerItem,
  Price,
  ButtonItem,
  ContainerItemText,
  Image,
  ScrollView,
  ScrollViewText,
  Title,
} from './styles';

interface ItemProps {
  item: Product;
}

const Item: React.FC<ItemProps> = ({item}) => {
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
      <Description>
        <ImageContainer>
          <Image source={{uri: item.image}} resizeMode="contain" />
        </ImageContainer>
        <Info>
          <ScrollView>
            <ScrollViewText>{item.description_sale}</ScrollViewText>
          </ScrollView>
          <Price>{`R$ ${formatReal(item.price)}`}</Price>
        </Info>
        <ContainerItem>
          <ButtonItem onPress={handleMinus}>
            <Icon name="minus-circle" color="#000" size={40} />
          </ButtonItem>
          <ContainerItemText>{item.quantity}</ContainerItemText>
          <ButtonItem onPress={handlePlus}>
            <Icon name="plus-circle" color="#000" size={40} />
          </ButtonItem>
        </ContainerItem>
      </Description>
    </Container>
  );
};

export default Item;
