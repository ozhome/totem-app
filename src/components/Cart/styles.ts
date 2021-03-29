import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  height: 50px;
  width: 100%;

  position: absolute;

  bottom: 0px;
  z-index: 15;
`;

export const Content = styled(RectButton)`
  width: 100%;
  height: 100%;
  background-color: #f6b24d;

  padding: 0 40px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Text = styled.Text`
  color: #000;
  font-weight: 700;
  font-size: 20px;
`;
