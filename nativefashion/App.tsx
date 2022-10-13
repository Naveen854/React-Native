import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {Onboarding} from './src/views/Authentication';

const AuthenticationStack= createNativeStackNavigator();

const AuthenticationNavigator = ()=>{
  return(
    <AuthenticationStack.Navigator screenOptions={{headerShown:false}}>
      <AuthenticationStack.Screen name='Onboarding' component={Onboarding}/>
    </AuthenticationStack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer >
      <AuthenticationNavigator/>
    </NavigationContainer>
  );
}