import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Modal from '../components/Modal';

import Izettle from '../pages/Izettle';
import SignIn from '../pages/SignIn';

import {useIzettle} from '../hooks/izettle';

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => {
  const {izettle, loading} = useIzettle();

  if (loading) {
    return <Modal visible />;
  }

  if (izettle) {
    return (
      <AuthStack.Navigator headerMode="none" initialRouteName="SignIn">
        <AuthStack.Screen name="SignIn" component={SignIn} />
      </AuthStack.Navigator>
    );
  }
  return (
    <AuthStack.Navigator headerMode="none" initialRouteName="Izettle">
      <AuthStack.Screen name="Izettle" component={Izettle} />
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
