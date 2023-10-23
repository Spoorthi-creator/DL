import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Q from '../screens/quataum';
import U from '../screens/unstoppableus';
import Roald from '../screens/roaldahl';
import Linus from '../screens/linus';
import Sapiens from '../screens/sapiens';
import Ger from '../screens/gernimo';
import Rick from '../screens/rick';
import David from '../screens/david';
import Eighty from '../screens/80';
import Boy from '../screens/boy';
import Kalam from '../screens/kalam';
import Hack from '../screens/hack';
import Iam from '../screens/iam';
import JS from '../screens/js';
import Cho1 from '../screens/catologue';

import Dash from '../screens/dashboard';
import BookDetail from '../screens/BookDetail';
import Cart from '../screens/cart';
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Cat" options={{
      headerShown: false,
    }} >
      
      <Stack.Screen
        name="Cat"
        component={Cho1}
        options={{
          headerShown: false,
        }}
      />
        <Stack.Screen name="BookDetail" component={BookDetail} options={{
      headerShown: false,
    }} />
    <Stack.Screen name="Cart" component={Cart} options={{
      headerShown: false,
    }} />
       
               
     

    </Stack.Navigator>
  );
};

export default StackNavigator;
