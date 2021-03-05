import React from 'react';

import {Container} from './styles';

interface IMain {
  show?: boolean;
}

const Main: React.FC<IMain> = ({children}) => {
  return <Container>{children}</Container>;
};

export default Main;
