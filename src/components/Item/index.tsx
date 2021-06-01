import React, {useCallback, useRef} from 'react';
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
  const {plusCart, minusCart} = useCart();
  const {updateInventory} = useInventory();
  const maxCharacters = useRef(item.name.length > 40 ? 60 : 95);

  const handlePlus = useCallback(() => {
    if (
      item.quantity + 1 <= item.qty_available ||
      (item.to_weight && (item.quantity + 1) / 1000 <= item.qty_available)
    ) {
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

  const inputAdd = useCallback(() => {
    openModal(item);
  }, [item, openModal]);

  return (
    <Container>
      <Title>{item.name}</Title>
      <Description>
        <ImageContainer>
          <Image source={{uri: item.image}} resizeMode="contain" />
        </ImageContainer>
        <Info>
          <DescriptionText>
            {item.description_sale.length > maxCharacters.current
              ? item.description_sale.substr(0, maxCharacters.current) + '...'
              : item.description_sale || ''}
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
