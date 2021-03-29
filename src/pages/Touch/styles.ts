import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  flex: 1;
  position: relative;

  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const Image = styled.Image`
  max-width: 50%;
  max-height: 80%;
  margin-right: 20px;
`;

export const Title = styled.View``;

export const TitleText = styled.Text`
  font-size: 36px;
  font-weight: 700;
`;

export const TitleTexSub = styled.Text`
  font-size: 22px;
  font-weight: 400;
`;

export const SubCategories = styled.View`
  width: 100%;
  height: 75px;

  position: relative;
  overflow: hidden;

  padding: 0 20px;
`;
