import React, { Component } from 'react';
import { Text, View, StyleSheet,LogBox } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Loading from './screens/loading';
import SignUp from './screens/signup';
import  Login from './screens/login';
import DashboardScreen from './screens/DashboardScreen.js';
import On from './screens/on';
import firebase from 'firebase';
import { firebaseConfig } from './screens/config';
import { createStackNavigator } from '@react-navigation/stack';



LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core and will be removed in a future release. "]);
const Stack = createStackNavigator();
const AppSwitchNavigator = createSwitchNavigator({
  Loading: Loading,
  On: On,
  Login: Login,
  SignUp: SignUp,
  DashboardScreen: DashboardScreen,
   
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

export default function App() {
  return <AppNavigator />;
}
