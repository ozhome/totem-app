import React from 'react';

import {useInventory} from '../../hooks/inventory';

import {Container, Text} from './styles';

interface SubCategoryProp {
  name: string;
  id: number;
}

const SubCatgory: React.FC<SubCategoryProp> = ({name, id}) => {
  const {selectedSub, selectedSubcategory} = useInventory();

  return (
    <Container onPress={() => selectedSubcategory(id)}>
      <Text selected={selectedSub === id}>{name}</Text>
    </Container>
  );
};

export default SubCatgory;
