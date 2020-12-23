import styled, {css} from 'styled-components/native';

interface IContainer {
  show: boolean;
}

export const Container = styled.View<IContainer>`
  width: 100%;
  height: 90%;
  position: relative;
  padding: 40px 20px;
  overflow: hidden;

  ${(props) =>
    props.show &&
    css`
      height: 100%;
    `}
`;
