import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {useInventory} from '../../hooks/inventory';

import {Container, Text, Image, ImageContainer} from './styles';

interface CategoryProps {
  image: string;
  name: string;
  id: number;
  first: boolean;
  isCategory?: boolean;
}

const Category: React.FC<CategoryProps> = ({
  image,
  name,
  id,
  first,
  isCategory = true,
}) => {
  const {selectedCategory, selectedSubcategory} = useInventory();
  const {navigate} = useNavigation();

  const handleCategory = async () => {
    if (isCategory) {
      selectedCategory(id);
      navigate('SubCategory');
    } else {
      selectedSubcategory(id);
      navigate('Items');
    }
  };

  return (
    <Container first={first} onPress={handleCategory}>
      <Text>{name}</Text>
      <ImageContainer>
        <Image source={{uri: image}} resizeMode="contain" />
      </ImageContainer>
    </Container>
  );
};

export default Category;
