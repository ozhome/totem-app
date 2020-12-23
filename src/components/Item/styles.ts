import styled from 'styled-components/native';

export const Container = styled.View`
  height: 250px;
  width: 100%;
  padding: 10px;

  border: 2px solid black;

  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

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
  height: 80%;
  width: 100%;

  margin-left: 8px;
  padding: 5px;

  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ImageContainer = styled.View`
  height: 100%;
  width: 35%;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
`;

export const Image = styled.Image`
  max-width: 100%;
  max-height: 100%;
`;

export const Info = styled.View`
  width: 55%;
  height: 100%;
  padding: 8px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: relative;
`;

export const ScrollView = styled.ScrollView`
  width: 55%;
  height: 80%;
  padding: 8px;

  position: relative;
`;

export const ScrollViewText = styled.Text`
  width: 100%;
  max-height: 70%;
  padding: 6px;
  font-size: 20px;
`;

export const Price = styled.Text`
  width: 100%;
  font-size: 24px;
`;

export const ContainerItem = styled.View`
  width: 50px;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const ContainerItemText = styled.Text`
  width: 50px;
  height: 28px;
  text-align: center;
  font-size: 28px;
`;

export const ButtonItem = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
`;
