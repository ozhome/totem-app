import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  position: absolute;
  z-index: 999;

  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.56);
`;

export const Content = styled.View`
  width: 40%;
  min-width: 400px;
  height: 80%;
  max-height: 300px;
  position: relative;
  border-radius: 18px;
  padding: 15px;

  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  background-color: #fff;
`;

export const Div = styled.View``;

export const Text = styled.Text`
  font-size: 22px;
  text-align: center;
  margin-bottom: 15px;
`;

export const TextInput = styled.TextInput`
  width: 100%;
  height: 60px;
  border-bottom-width: 1px;
  font-size: 22px;
  margin-bottom: 30px;
`;

export const Button = styled(RectButton)`
  width: 90%;
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
