import React from 'react';
import {ActivityIndicator} from 'react-native';

import {Container} from './styles';

interface ModalProps {
  visible: boolean;
}

const Modal: React.FC<ModalProps> = ({visible, children}) => {
  return !visible ? (
    <></>
  ) : (
    <Container>
      {children ? children : <ActivityIndicator size={80} color="#f9a72b" />}
    </Container>
  );
};

export default Modal;
