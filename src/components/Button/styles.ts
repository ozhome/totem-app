import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 80px;
  background: #f9a72b;
  border-radius: 10px;
  margin-top: 8px;

  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #312e38;
`;
