import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  width: 100%;
  height: 80px;
  padding: 0 20px;
  border: 1px solid #000;
  border-radius: 10px;
  margin-bottom: 6px;

  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: 24px;
  color: #000;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 6px;
`;
