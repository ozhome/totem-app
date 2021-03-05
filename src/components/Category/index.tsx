import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

import {useInventory} from '../../hooks/inventory';

import {Container, Text, Image, ImageContainer} from './styles';

interface CategoryProps {
  image: string;
  name: string;
  id: number;
}

const Category: React.FC<CategoryProps> = ({image, name, id}) => {
  const {selectedCategory} = useInventory();
  const {navigate} = useNavigation();

  const handleCategory = useCallback(async () => {
    selectedCategory(id);
    navigate('Items');
  }, [navigate, id, selectedCategory]);

  return (
    <Container onPress={handleCategory}>
      <Text>{name}</Text>
      <ImageContainer>
        <Image source={{uri: image}} resizeMode="contain" />
      </ImageContainer>
    </Container>
  );
};

export default Category;
