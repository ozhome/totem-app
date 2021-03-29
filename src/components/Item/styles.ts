import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  height: 100%;
  width: 325px;
  padding: 10px;
  border: 2px solid black;
  position: relative;
  flex-direction: column;
  align-items: center;
  margin-left: 8px;

  overflow: hidden;
`;

export const Title = styled.Text`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  margin-bottom: 8px;
  text-align: center;
`;

export const Description = styled.View`
  flex: 1;
  width: 100%;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const ImageContainer = styled.View`
  width: 100%;
  max-height: 38%;

  position: relative;
  justify-content: center;
  align-items: center;

  overflow: hidden;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

export const Info = styled.View`
  width: 100%;
  height: 49%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;

  position: relative;
`;

export const DescriptionText = styled.Text`
  width: 100%;
  font-size: 20px;
`;

export const PriceContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-content: center;
`;

export const Price = styled.Text`
  font-size: 20px;
`;

export const ContainerItem = styled.View`
  width: 100%;
  height: 13%;

  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const ContainerQty = styled(RectButton)`
  width: 180px;
  height: 100%;
  flex-direction: row;
  justify-content: center;
`;

export const ContainerItemText = styled.Text`
  font-size: 25px;
`;

export const ButtonItem = styled.TouchableOpacity`
  width: 40px;
  height: 100%;
`;
