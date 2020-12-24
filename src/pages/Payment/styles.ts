import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  position: relative;

  display: flex;
  flex-direction: row;
`;

export const Text = styled.Text`
  font-size: 28px;
`;

export const Content = styled.View`
  width: 70%;
  height: 100%;

  position: relative;
`;

export const InfoCard = styled.View`
  width: 100%;
  height: 20%;

  position: relative;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const TextTitele = styled.Text`
  font-size: 28px;
`;

export const Cards = styled.View`
  width: 100%;
  height: 70%;

  padding: 30px;

  position: relative;
  flex-direction: row;
  justify-content: space-around;
`;

export const CardButton = styled.View`
  width: 30%;
`;

export const Name = styled.View`
  width: 100%;
  height: 15%;

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 80px;

  border: 1px solid #000;

  font-size: 28px;
  padding: 5px 10px;
`;

export const Finish = styled.View`
  width: 100%;
  height: 10%;

  position: relative;
  display: flex;
  align-items: flex-end;

  padding: 0px 20px;
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
