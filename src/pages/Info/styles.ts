import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
  position: relative;
  justify-content: center;
  align-content: center;
  padding: 0 20px 50px;
`;

export const Content = styled.View`
  flex: 1;
  width: 80%;
  align-self: center;
  justify-content: space-around;
`;

export const Form = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Row = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Div = styled.View`
  width: 50%;
`;

export const Text = styled.Text`
  font-size: 20px;
  color: #c53030;
`;

export const TextInput = styled.TextInput`
  width: 95%;
  height: 60px;
  border-bottom-width: 1px;
  font-size: 22px;
`;

export const Button = styled(RectButton)`
  width: 100%;
  height: 45px;
  background-color: #f9a72b;
  align-self: center;
  align-content: center;
  justify-content: center;
  border-radius: 16px;
`;

export const ButtonText = styled.Text`
  text-align: center;
  font-size: 22px;
  font-weight: 700;
`;
