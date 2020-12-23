import React from 'react';
import {FlatList} from 'react-native';

import SubCategory from '../SubCategory';

import {useInventory} from '../../hooks/inventory';

import logo from '../../assets/images/logo.png';

import {
  Container,
  Message,
  Title,
  SubCategories,
  IconLeft,
  IconRight,
  TitleTexSub,
  TitleText,
  Image,
} from './styles';

interface HeaderProps {
  isHome?: boolean;
}

const Header: React.FC<HeaderProps> = ({isHome = false}) => {
  const {categories} = useInventory();

  return (
    <Container>
      <Message>
        <Title>
          <TitleText>Bem vindo a Oz</TitleText>
          <TitleTexSub>Toque na tela para fazer seu pedido</TitleTexSub>
        </Title>
        <Image source={logo} resizeMode="cover" />
      </Message>
      {!isHome && (
        <SubCategories>
          <IconLeft name="chevron-left" size={40} color="#000" />
          <FlatList
            data={categories.filter((categ) => categ.has_product)}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({item}) => (
              <SubCategory name={item.name} id={item.id} />
            )}
          />
          <IconRight name="chevron-right" size={40} color="#000" />
        </SubCategories>
      )}
    </Container>
  );
};

export default Header;
