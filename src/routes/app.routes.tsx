import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../pages/Home';
import Items from '../pages/Items';
import Payment from '../pages/Payment';

const AppStack = createStackNavigator();

const AppRoutes: React.FC = () => (
  <AppStack.Navigator headerMode="none" initialRouteName="Home">
    <AppStack.Screen name="Home" component={Home} />
    <AppStack.Screen name="Items" component={Items} />
    <AppStack.Screen name="Payment" component={Payment} />
  </AppStack.Navigator>
);

export default AppRoutes;
