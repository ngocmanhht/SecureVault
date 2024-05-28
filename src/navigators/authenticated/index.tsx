import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '../../const';
import BottomTabs from './bottom-tab';

const Stack = createStackNavigator();
export const AuthenticatedNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Screens.BottomTab} component={BottomTabs} />
    </Stack.Navigator>
  );
};
