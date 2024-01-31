import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from './bottom-tab';
import { Screens } from '../const';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Screens.BottomTab} component={BottomTabs} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
