/* eslint-disable react/react-in-jsx-scope */
import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '../../const';
import BottomTabs from '../authenticated/bottom-tab';
import { Walkthrough } from '../../screens/authentication/walkthrough';
import { Login } from '../../screens/authentication/login';
import { Register } from '../../screens/authentication/register';
import { RegisterSuccess } from '../../screens/authentication/register-success';

const Stack = createStackNavigator();

export const AuthenticationNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Screens.Walkthrough} component={Walkthrough} />
      <Stack.Screen name={Screens.Login} component={Login} />
      <Stack.Screen name={Screens.Register} component={Register} />
      <Stack.Screen
        name={Screens.RegisterSuccess}
        component={RegisterSuccess}
      />
    </Stack.Navigator>
  );
};
