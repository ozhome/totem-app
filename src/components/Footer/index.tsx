import React, {useCallback} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

import {Container, Button, ButtonText} from './styles';

const Footer: React.FC = () => {
  const {goBack} = useNavigation();

  return (
    <Container>
      <Button onPress={goBack}>
        <Icon name="arrow-left" size={40} color="#000" />
        <ButtonText>Voltar</ButtonText>
      </Button>
    </Container>
  );
};

export default Footer;
