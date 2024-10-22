/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigators';
import { Provider } from 'mobx-react';
import stores from './src/stores';
import Toast from 'react-native-toast-message';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { navigationService } from './src/service/navigation-service';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/service/query-client';
import LoadingIndicator from './src/components/loading-indicator';

import JailMonkey from 'jail-monkey';
import { Alert, AppState, View } from 'react-native';
import { Text } from './src/components/text';
import { Colors, FontSizes } from './src/assets/styles';
import TouchID from 'react-native-touch-id';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import CustomSnackBar from './src/components/custom-snack-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ScreenGuardModule, {
  ScreenGuardConstants,
} from 'react-native-screenguard';

function App(): JSX.Element {
  const [isRoot, setIsRoot] = useState(false);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    if (JailMonkey.isJailBroken()) {
      setIsRoot(true);
      Alert.alert(
        'Có vẻ như thiết bị đã bị jaibreak. Xin vui lòng thử lại sau',
      );
    }
  }, []);

  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     if (appState.current.match(/background/) && nextAppState === 'active') {
  //       console.log('App has come to the foreground!');
  //     }
  //     console.log('nextAppState', nextAppState);

  //     if (nextAppState === 'inactive') {
  //       return;
  //     }
  //     console.log('nextAppState', nextAppState);

  //     appState.current = nextAppState;
  //     setAppStateVisible(appState.current);
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);
  useEffect(() => {
    ScreenGuardModule.register({
      backgroundColor: Colors.red,
      timeAfterResume: 2000,
    });
    ScreenGuardModule.registerScreenshotEventListener(false, event =>
      Alert.alert(`Không thể chụp màn hình,`),
    );
    ScreenGuardModule.registerScreenRecordingEventListener(_ =>
      Alert.alert('Không thể quay màn hình'),
    );

    return () => {
      ScreenGuardModule.unregister();
    };
  }, []);

  return !isRoot ? (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Provider {...stores}>
            <SafeAreaProvider>
              <QueryClientProvider client={queryClient}>
                <PaperProvider>
                  <NavigationContainer ref={navigationService.navigationRef}>
                    <AppNavigator />
                    <LoadingIndicator />
                  </NavigationContainer>
                </PaperProvider>
                <Toast />
                <CustomSnackBar />
              </QueryClientProvider>
            </SafeAreaProvider>
          </Provider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
      {/* {appStateVisible === 'active' ? (
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
      ) : (
        <View
          style={{
            backgroundColor: Colors.red,
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: FontSizes.xxl,
              color: 'white',
              alignSelf: 'center',
            }}>
            Secure Vault
          </Text>
        </View>
      )} */}
    </>
  ) : (
    <></>
  );
}

export default App;
