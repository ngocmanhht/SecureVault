/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-url-polyfill/auto';
import { Platform, NativeModules } from 'react-native';
import 'react-native-gesture-handler';


if (__DEV__) {
  require('./ReactotronConfig');
}
// if (__DEV__ && Platform.OS === 'ios') {
//   NativeModules.DevSettings.setIsDebuggingRemotely(true);
// }
AppRegistry.registerComponent(appName, () => App);
