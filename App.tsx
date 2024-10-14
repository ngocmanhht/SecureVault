/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigators';
import { Provider } from 'mobx-react';
import stores from './src/stores';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import { setupURLPolyfill } from 'react-native-url-polyfill';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { navigationService } from './src/service/navigation-service';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/service/query-client';
import LoadingIndicator from './src/components/loading-indicator';
function App(): JSX.Element {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider {...stores}>
          <QueryClientProvider client={queryClient}>
            <PaperProvider>
              <NavigationContainer ref={navigationService.navigationRef}>
                <AppNavigator />
                <LoadingIndicator />
              </NavigationContainer>
            </PaperProvider>
            <Toast />
          </QueryClientProvider>
        </Provider>
      </GestureHandlerRootView>
    </>
  );
}

export default App;
