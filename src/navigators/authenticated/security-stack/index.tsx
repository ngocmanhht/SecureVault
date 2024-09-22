/* eslint-disable react/react-in-jsx-scope */
import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '../../../const';
import Vault from '../../../screens/authenticated/vault';
import { AddNewItem } from '../../../screens/authenticated/add-item';
import { FontSizes } from '../../../assets/styles/typography';
import { AddScreen } from '../../../screens/authenticated/add';
import { NoteType } from '../../../type/note';
import Security from '../../../screens/authenticated/security';
import { GeneratePassword } from '../../../screens/authenticated/generate-password';
import PasswordHistory from '../../../screens/authenticated/password-history';

const Stack = createStackNavigator();

export const SecurityStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={Screens.Security}
        component={Security}
      />
      <Stack.Screen
        options={{
          headerMode: 'screen',
          animationTypeForReplace: 'pop',
          headerShown: false,
          headerBackTitle: 'Quay lại',
          headerTitle: 'Tạo mật khẩu',
          headerBackTitleStyle: {
            fontSize: FontSizes.content,
          },
        }}
        name={Screens.GeneratePassword}
        component={GeneratePassword}
      />
      <Stack.Screen
        options={{
          headerMode: 'screen',
          animationTypeForReplace: 'pop',
          headerBackTitle: 'Quay lại',
          headerTitle: 'Lịch sử',
          headerBackTitleStyle: {
            fontSize: FontSizes.content,
            fontFamily: 'Inter-Regular',
          },
          headerTitleStyle: {
            fontSize: FontSizes.header,
            fontFamily: 'Inter-Bold',
          },
        }}
        name={Screens.PasswordHistory}
        component={PasswordHistory}
      />
    </Stack.Navigator>
  );
};
