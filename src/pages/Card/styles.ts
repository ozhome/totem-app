import styled, {css} from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

interface IButton {
  custom?: boolean;
  select?: boolean;
}

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
  width: 50%;
  align-self: center;
  justify-content: space-around;
`;

export const Div = styled.View``;

export const Text = styled.Text`
  font-size: 20px;
  color: #c53030;
`;

export const TextInput = styled.TextInput`
  width: 100%;
  height: 60px;
  border-bottom-width: 1px;
  font-size: 22px;
`;

export const Button = styled(RectButton)<IButton>`
  width: 100%;
  height: 45px;
  background-color: #f9a72b;
  align-self: center;
  align-content: center;
  justify-content: center;
  border-radius: 16px;

  ${(props) =>
    props.custom &&
    css`
      background-color: ${props.select ? '#f9a72b' : '#fff'};
      margin-bottom: 15px;
    `}
`;

export const ButtonText = styled.Text`
  text-align: center;
  font-size: 22px;
  font-weight: 700;
`;

export const TextModal = styled.Text`
  font-size: 28px;
`;

export const ModalContent = styled.View`
  background-color: #fff;
  border-radius: 50px;

  margin-top: 25px;

  width: 70%;
  height: 400px;

  padding: 50px;

  display: flex;
  flex-direction: column;

  justify-content: space-around;
  align-items: center;
`;
