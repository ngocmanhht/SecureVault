import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from './authenticated/bottom-tab';
import { Screens } from '../const';
import { AuthenticatedNavigator } from './authenticated';
import { AuthenticationNavigator } from './authentication';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={Screens.Authentication}
        component={AuthenticationNavigator}
      />
      <Stack.Screen
        name={Screens.Authenticated}
        component={AuthenticatedNavigator}
        options={{
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
