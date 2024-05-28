import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '../../const';
import BottomTabs from '../authenticated/bottom-tab';

const Stack = createStackNavigator();

const AuthenticationNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Screens.BottomTab} component={BottomTabs} />
    </Stack.Navigator>
  );
};
