/* eslint-disable react/react-in-jsx-scope */
import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '../../../const';
import Vault from '../../../screens/authenticated/vault';
import { AddNewItem } from '../../../screens/authenticated/add-item';
import { FontSizes } from '../../../assets/styles/typography';
import { AddScreen } from '../../../screens/authenticated/add';
import { NoteType } from '../../../type/note';

type VaultStackNavigatorParamList = {
  [Screens.Vault]: undefined;
  [Screens.AddNewItem]: undefined;
  [Screens.Add]: {
    type: NoteType;
  };
};

const Stack = createStackNavigator<VaultStackNavigatorParamList>();

export const VaultStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Screens.Vault} component={Vault} />
      <Stack.Screen
        options={{
          headerMode: 'screen',
          animationTypeForReplace: 'pop',
          headerShown: true,
          headerBackTitle: 'Cancel',
          headerTitle: 'Add Item',
          headerBackTitleStyle: {
            fontSize: FontSizes.content,
          },
        }}
        name={Screens.AddNewItem}
        component={AddNewItem}
      />
      <Stack.Screen
        options={{
          headerMode: 'screen',
          animationTypeForReplace: 'pop',
          headerShown: true,
          headerBackTitle: 'Cancel',
          headerTitle: 'Add Item',
          headerBackTitleStyle: {
            fontSize: FontSizes.content,
          },
        }}
        name={Screens.Add}
        component={AddScreen}
      />
    </Stack.Navigator>
  );
};
