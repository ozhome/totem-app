import styled, {css} from 'styled-components/native';

interface SubCategoryProps {
  selected: boolean;
}

export const Container = styled.TouchableOpacity`
  height: 50px;
  margin: 0 22px;

  justify-content: center;
  align-content: center;
`;

export const Text = styled.Text<SubCategoryProps>`
  font-size: 22px;
  width: auto;

  ${(props) =>
    props.selected &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: #000;
    `};
`;
