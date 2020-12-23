import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  height: 200px;
  width: 100%;
  padding: 0 20px;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Message = styled.View`
  height: 120px;
  width: 100%;

  position: relative;

  flex-direction: row;
  justify-content: space-between;
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

export const IconLeft = styled(Icon)`
  z-index: 99;
  position: absolute;
  left: -8px;
  top: 7px;
  width: 30px;
  height: 30px;
`;

export const IconRight = styled(Icon)`
  z-index: 99;
  position: absolute;
  right: -8px;
  top: 7px;
  width: 30px;
  height: 30px;
`;
