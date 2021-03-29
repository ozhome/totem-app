import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View``;

export const Content = styled.View`
  padding: 5px;
  width: 100%;
  height: 80px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const GoBackContainer = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  margin-right: 30px;
`;

export const GoBackIcon = styled(Icon)``;

export const HeaderText = styled.Text`
  color: #000;
  font-size: 22px;
  font-weight: 700;
`;

export const HeaderImage = styled.Image`
  max-height: 90%;
`;

export const Categories = styled.View`
  padding: 0 30px;
  height: 50px;
  width: 100%;
`;

export const IconLeft = styled(Icon)`
  z-index: 99;
  position: absolute;
  left: -7px;
  top: 5px;
  width: 40px;
  height: 40px;
`;

export const IconRight = styled(Icon)`
  z-index: 99;
  position: absolute;
  right: -7px;
  top: 5px;
  width: 40px;
  height: 40px;
`;
