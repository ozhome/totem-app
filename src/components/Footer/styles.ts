import styled from 'styled-components/native';

export const Container = styled.View`
  height: 10%;
  width: 70%;

  padding: 0 20px;
  position: relative;

  background-color: #fff;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  height: 70%;
  width: 100%;

  border: 1px solid #000;
  padding: 0 12px;

  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #000;
  font-size: 32px;
  margin-left: 30px;
`;
