import React, {useCallback, useEffect, useState} from 'react';
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
  const [value, setValue] = useState('');
  const {updateCart} = useCart();
  const {updateInventory} = useInventory();

  const handle = useCallback(() => {
    if (!value) {
      updateInventory({...item, quantity: 0});
      updateCart({...item, quantity: 0});
      close(false);
      return;
    }

    const quantity = parseInt(value, 10);

    if (quantity <= 0) {
      updateInventory({...item, quantity: 0});
      updateCart({...item, quantity: 0});
    } else if (item.to_weight && quantity / 1000 <= item.qty_available) {
      updateInventory({...item, quantity});
      updateCart({...item, quantity});
    } else if (quantity <= item.qty_available) {
      updateInventory({...item, quantity});
      updateCart({...item, quantity});
    } else if (item.to_weight) {
      updateInventory({...item, quantity: item.qty_available * 1000});
      updateCart({...item, quantity: item.qty_available});
    } else {
      updateInventory({...item, quantity: item.qty_available});
      updateCart({...item, quantity: item.qty_available});
    }

    close(false);
  }, [close, item, updateCart, updateInventory, value]);

  useEffect(() => {
    setValue('');
  }, [item]);

  return !visible ? (
    <></>
  ) : (
    <Container>
      <Content>
        <Div>
          <Text>Informe a quantidade</Text>
          <TextInput
            keyboardType="numeric"
            value={value}
            placeholder={`Digite a quantidade${
              item.to_weight ? ' em gramas' : ''
            }`}
            onChangeText={(e) => {
              return setValue(e.replace(/\D/g, ''));
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
