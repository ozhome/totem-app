import React from 'react';
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
  PriceContainer,
  Price,
  ButtonItem,
  ContainerItemText,
  ContainerQty,
  Image,
  DescriptionText,
  Title,
} from './styles';

interface ItemProps {
  item: Product;
  openModal(item: Product): void;
}

const Item: React.FC<ItemProps> = ({item, openModal}) => {
  const {updateCart} = useCart();
  const {updateInventory} = useInventory();

  const updateInputValue = (quantity: number, inputSet = false) => {
    updateInventory({...item, quantity}, inputSet);
    updateCart({...item, quantity}, inputSet);
  };

  const handlePlus = () => {
    const quantity = item.to_weight ? 10 : 1;
    updateInputValue(quantity);
  };

  const handleMinus = () => {
    const quantity = item.to_weight ? -10 : -1;
    updateInputValue(quantity);
  };

  const inputAdd = () => {
    openModal(item);
  };

  return (
    <Container>
      <Title>{item.name}</Title>
      <Description>
        <ImageContainer>
          <Image source={{uri: item.image}} resizeMode="contain" />
        </ImageContainer>
        <Info>
          <DescriptionText numberOfLines={3}>
            {item.description_sale}
          </DescriptionText>
          <PriceContainer>
            <Price>{`R$ ${formatReal(item.price)}`}</Price>
          </PriceContainer>
        </Info>
        <ContainerItem>
          <ButtonItem onPress={handleMinus}>
            <Icon name="minus-circle" color="#000" size={40} />
          </ButtonItem>
          <ContainerQty onPress={inputAdd}>
            <ContainerItemText>{item.quantity}</ContainerItemText>
            <ContainerItemText>{item.to_weight ? 'g' : ''}</ContainerItemText>
          </ContainerQty>
          <ButtonItem onPress={handlePlus}>
            <Icon name="plus-circle" color="#000" size={40} />
          </ButtonItem>
        </ContainerItem>
      </Description>
    </Container>
  );
};

export default Item;
