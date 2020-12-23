import styled from 'styled-components/native';

export const Container = styled.View`
  width: 30%;
  height: 100%;

  background-color: #000;
  padding: 50px 10px;
  color: #fff;

  position: relative;
  flex-direction: column;
  justify-content: space-between;
`;

export const Description = styled.View`
  width: 100%;
  height: 85%;

  position: relative;
`;

export const Icon = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  position: relative;

  margin-bottom: 10px;
`;

export const IconText = styled.Text`
  color: #fff;
  text-align: center;
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 10px;
  margin-right: 10px;
`;

export const IconSpan = styled.View`
  position: absolute;

  border-radius: 50px;
  background-color: #fff;

  width: 30px;
  height: 30px;

  right: 80px;
  top: -10px;
`;

export const IconNumber = styled.Text`
  color: #000;
  font-size: 22px;
  font-weight: 700;
  width: 30px;
  height: 30px;
  text-align: center;
  margin-top: 4px;
`;

export const Total = styled.View`
  width: 100%;
  height: 15%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const TotalText = styled.Text`
  font-size: 28px;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 60px;

  font-size: 28px;
  font-weight: 400;
  background-color: #fff;
`;

export const ButtonText = styled.Text`
  font-size: 28px;
`;
