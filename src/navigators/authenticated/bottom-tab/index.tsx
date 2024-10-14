import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Screens } from '../../../const';
import { Settings } from '../../../screens/authenticated/settings';
import { Icon } from '../../../components/Icon';
import { Icons } from '../../../assets/icons/const';
import Vault from '../../../screens/authenticated/vault';
import Update from '../../../screens/authenticated/update';
import Security from '../../../screens/authenticated/security';
import { sizeWidth } from '../../../assets/styles';
import { VaultStackNavigator } from '../vault-stack';
import { SecurityStackNavigator } from '../security-stack';
import { SettingStackNavigator } from '../setting-stack';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderRadius: 15,
          alignSelf: 'center',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.2,
          shadowRadius: 5.62,
          elevation: 7,
        },
        tabBarActiveTintColor: 'red',
        tabBarItemStyle: {
          top: 6,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Kho',
          tabBarIcon: ({ focused }) => (
            <Icon source={focused ? Icons.ActiveVault : Icons.Vault} />
          ),
          headerShown: false,
        }}
        name={Screens.VaultStackNavigator}
        component={VaultStackNavigator}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Nâng cấp',
          tabBarIcon: ({ focused }) => (
            <Icon source={focused ? Icons.ActiveDiamond : Icons.Diamond} />
          ),
          headerTitle: 'Nâng cấp',
        }}
        name={Screens.Update}
        component={Update}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Bảo mật',
          headerTitle: 'Bảo mật',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon source={focused ? Icons.ActiveSecurity : Icons.Security} />
          ),
        }}
        name={Screens.SecurityStackNavigator}
        component={SecurityStackNavigator}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Cài đặt',
          tabBarIcon: ({ focused }) => (
            <Icon source={focused ? Icons.ActiveSetting : Icons.Setting} />
          ),
          headerTitle: 'Cài đặt',
        }}
        name={Screens.SettingsStackNavigator}
        component={SettingStackNavigator}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
