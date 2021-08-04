import React from 'react';
import {FlatList, TouchableHighlight} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import SubCategory from '../SubCategory';

import {useInventory} from '../../hooks/inventory';

import logo from '../../assets/images/logo.png';

import {
  Container,
  Content,
  HeaderContent,
  HeaderText,
  HeaderImage,
  GoBackContainer,
  GoBackIcon,
  Categories,
  IconLeft,
  IconRight,
  HeaderContainerImage,
  HeaderTextInfo,
} from './styles';

interface HeaderProps {
  text?: string;
  goBack?: boolean;
  showCategories?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  goBack,
  showCategories,
  text = 'Selecione uma categoria',
}) => {
  const {categories} = useInventory();
  const navigate = useNavigation();

  return (
    <Container>
      <Content>
        <HeaderContent>
          {goBack && (
            <GoBackContainer onPress={navigate.goBack}>
              <GoBackIcon name="chevron-left" size={40} color="#000" />
              <HeaderText>Voltar</HeaderText>
            </GoBackContainer>
          )}
          <HeaderTextInfo>{text}</HeaderTextInfo>
        </HeaderContent>
        <HeaderContainerImage>
          <TouchableHighlight onPress={navigate.goBack}>
            <HeaderImage source={logo} resizeMode="contain" />
          </TouchableHighlight>
        </HeaderContainerImage>
      </Content>
      {showCategories && (
        <Categories>
          <IconLeft name="chevron-left" size={40} color="#000" />
          <FlatList
            data={categories.filter((categ) => categ.has_product)}
            keyExtractor={(item) => `${item.id}`}
            horizontal
            renderItem={({item}) => (
              <SubCategory name={item.name} id={item.idOdoo} />
            )}
          />
          <IconRight name="chevron-right" size={40} color="#000" />
        </Categories>
      )}
    </Container>
  );
};

export default Header;
