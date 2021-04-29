import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../pages/Home';
import Touch from '../pages/Touch';
import Items from '../pages/Items';
import Cart from '../pages/Cart';
import Name from '../pages/Name';
import Cpf from '../pages/Cpf';
import Email from '../pages/Email';
import Card from '../pages/Card';

const AppStack = createStackNavigator();

const AppRoutes: React.FC = () => (
  <AppStack.Navigator
    headerMode="none"
    initialRouteName="Touch"
    screenOptions={{
      cardStyle: {backgroundColor: '#FFF'},
    }}>
    <AppStack.Screen name="Touch" component={Touch} />
    <AppStack.Screen name="Home" component={Home} />
    <AppStack.Screen name="Items" component={Items} />
    <AppStack.Screen name="Cart" component={Cart} />
    <AppStack.Screen name="Name" component={Name} />
    <AppStack.Screen name="Cpf" component={Cpf} />
    <AppStack.Screen name="Email" component={Email} />
    <AppStack.Screen name="Card" component={Card} />
  </AppStack.Navigator>
);

export default AppRoutes;
