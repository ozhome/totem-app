import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  min-height: 150px;

  background-color: #fff;
  padding: 10px;

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-bottom: 20px;

  color: #000;
`;

export const Title = styled.Text`
  font-size: 26px;
  text-align: center;
`;

export const ContainerItem = styled.View`
  width: 100%;
  height: 70px;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
`;

export const Text = styled.Text`
  width: 30%;
  text-align: center;
  font-size: 28px;
`;
