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
import { Settings } from '../../../screens/authenticated/settings';
import { Account } from '../../../screens/authenticated/account';
import { ChangePassword } from '../../../screens/authenticated/change-password';
import { SecuritySettings } from '../../../screens/authenticated/security-settings';
import { Options } from '../../../screens/authenticated/options';

const Stack = createStackNavigator();

export const SettingStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={Screens.Settings}
        component={Settings}
      />
      <Stack.Screen
        options={{
          headerMode: 'screen',
          animationTypeForReplace: 'pop',
          headerBackTitle: 'Cài đặt',
          headerTitle: 'Tài khoản',
          headerBackTitleStyle: {
            fontSize: FontSizes.content,
          },
        }}
        name={Screens.Account}
        component={Account}
      />
      <Stack.Screen
        options={{
          headerMode: 'screen',
          animationTypeForReplace: 'pop',
          headerBackTitle: 'Tài khoản',
          headerTitle: 'Thay đổi mật khẩu chính',
          headerBackTitleStyle: {
            fontSize: FontSizes.content,
          },
        }}
        name={Screens.ChangePassword}
        component={ChangePassword}
      />

      <Stack.Screen
        options={{
          headerMode: 'screen',
          animationTypeForReplace: 'pop',
          headerBackTitle: 'Tài khoản',
          headerTitle: 'Bảo mật',
          headerBackTitleStyle: {
            fontSize: FontSizes.content,
          },
        }}
        name={Screens.SecuritySettings}
        component={SecuritySettings}
      />

      <Stack.Screen
        options={{
          headerMode: 'screen',
          animationTypeForReplace: 'pop',
          headerBackTitle: 'Trở lại',
          headerTitle: 'Options',
          headerBackTitleStyle: {
            fontSize: FontSizes.content,
          },
        }}
        name={Screens.Options}
        component={Options}
      />
    </Stack.Navigator>
  );
};
