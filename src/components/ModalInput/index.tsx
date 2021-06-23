import React, {useRef} from 'react';
import {useCart} from '../../hooks/cart';

import {Product, useInventory} from '../../hooks/inventory';

import {
  Container,
  Content,
  Text,
  TextInput,
  Button,
  ButtonText,
  Div,
} from './styles';

interface ModalProps {
  visible: boolean;
  item: Product;
  close(value: boolean): void;
}

const ModalInput: React.FC<ModalProps> = ({visible, item, close}) => {
  const {updateCart} = useCart();
  const {updateInventory} = useInventory();
  const inputValue = useRef<number>(item.quantity);

  const handle = () => {
    if (inputValue.current !== item.quantity) {
      updateInventory({...item, quantity: inputValue.current || 0}, true);
      updateCart({...item, quantity: inputValue.current || 0}, true);
    }
    close(false);
  };

  return !visible ? (
    <></>
  ) : (
    <Container>
      <Content>
        <Div>
          <Text>Informe a quantidade</Text>
          <TextInput
            keyboardType="numeric"
            placeholder={`Digite a quantidade${
              item.to_weight ? ' em gramas' : ''
            }`}
            onChangeText={(e) => {
              const value = e.replace(/\D/g, '');
              inputValue.current = parseFloat(value);
            }}
          />
        </Div>

        <Button onPress={handle}>
          <ButtonText>Salvar</ButtonText>
        </Button>
      </Content>
    </Container>
  );
};

export default ModalInput;
