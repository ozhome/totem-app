import React from 'react';

import {Container} from './styles';

interface IMain {
  show?: boolean;
}

const Main: React.FC<IMain> = ({show, children}) => {
  return <Container show={!!show}>{children}</Container>;
};

export default Main;
