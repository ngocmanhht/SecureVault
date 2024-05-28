/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigators';
import { Provider } from 'mobx-react';
import stores from './src/stores';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'react-native';

function App(): JSX.Element {
  return (
    <>
      <Provider {...stores}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        <Toast />
      </Provider>
    </>
  );
}

export default App;
