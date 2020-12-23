import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  background: #fff;
  height: 240px;
  width: 300px;

  margin-right: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

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

export const Image = styled.Image`
  padding-bottom: 5px;
  max-height: 180px;
  max-width: 200px;
`;
