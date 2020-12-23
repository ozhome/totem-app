import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  background: #fff;
  height: 240px;
  flex-grow: 1;
  flex-basis: 0;

  margin-right: 15px;
  align-items: center;

  position: relative;

  margin-bottom: 40px;
`;

export const Text = styled.Text`
  font-size: 25px;
  font-weight: 700;
  line-height: 25px;
  text-align: center;
  padding: 10px 4px 5px 4px;
  height: 90px;
`;

export const ImageContainer = styled.View`
  height: 140px;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
`;
