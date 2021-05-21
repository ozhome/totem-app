import styled, {css} from 'styled-components/native';

interface Props {
  first: boolean;
}

export const Container = styled.TouchableOpacity<Props>`
  border-radius: 16px;
  border-width: 2px;
  height: 240px;
  flex-grow: 1;
  flex-basis: 0;

  margin-right: 15px;
  align-items: center;
  justify-content: flex-start;

  position: relative;

  margin-bottom: 15px;

  ${(props) =>
    props.first &&
    css`
      display: none;
    `}
`;

export const Text = styled.Text`
  font-size: 25px;
  font-weight: 700;
  line-height: 25px;
  text-align: center;
  padding: 10px 4px 5px 4px;
`;

export const ImageContainer = styled.View`
  flex: 1;
  width: 100%;
  position: relative;
  overflow: hidden;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
`;
