import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 60px;
  margin-top: 30px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #000;
  margin: 30px 0 24px;
`;

export const TextModal = styled.Text`
  font-size: 22px;
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

export const ImageContainer = styled.View`
  flex: 1;
  width: 100%;
`;
export const Image = styled.Image`
  width: 100%;
  height: 100%;
`;
