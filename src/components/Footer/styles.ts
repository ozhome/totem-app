import styled from 'styled-components/native';

export const Container = styled.View`
  height: 10%;
  width: 100%;

  padding: 0 20px;
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  border-radius: 10px;
  margin-top: 8px;

  align-items: center;
  justify-content: center;
  height: 70%;
  width: 100%;

  background: #f9a72b;
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
