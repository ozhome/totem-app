import React from 'react';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import {useAuth} from '../hooks/auth';

const Routes: React.FC = () => {
  const {store} = useAuth();

  return store ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
