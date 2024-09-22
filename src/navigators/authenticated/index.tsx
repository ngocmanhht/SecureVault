/* eslint-disable react/react-in-jsx-scope */
import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '../../const';
import BottomTabs from './bottom-tab';
import { AddNewItem } from '../../screens/authenticated/add-item';
import { fontSize, FontSizes } from '../../assets/styles';

const Stack = createStackNavigator();
export const AuthenticatedNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerMode: 'screen',
      }}>
      <Stack.Screen
        options={{
          animationTypeForReplace: 'pop',
        }}
        name={Screens.BottomTab}
        component={BottomTabs}
      />
    </Stack.Navigator>
  );
};
