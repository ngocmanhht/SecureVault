import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Screens } from '../../const';
import { Settings } from '../../screens/settings';
import { Icon } from '../../components/Icon';
import { Icons } from '../../assets/icons/const';
import Vault from '../../screens/vault';
import Update from '../../screens/update';
import Security from '../../screens/security';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderRadius: 15,
        },
        tabBarActiveTintColor: 'red',
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Kho',
          tabBarIcon: ({ focused }) => (
            <Icon source={focused ? Icons.ActiveVault : Icons.Vault} />
          ),
        }}
        name={Screens.Vault}
        component={Vault}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Nâng cấp',
          tabBarIcon: ({ focused }) => (
            <Icon source={focused ? Icons.ActiveDiamond : Icons.Diamond} />
          ),
        }}
        name={Screens.Update}
        component={Update}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Bảo mật',
          tabBarIcon: ({ focused }) => (
            <Icon source={focused ? Icons.ActiveSecurity : Icons.Security} />
          ),
        }}
        name={Screens.Security}
        component={Security}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Cài đặt',
          tabBarIcon: ({ focused }) => (
            <Icon source={focused ? Icons.ActiveSetting : Icons.Setting} />
          ),
        }}
        name={Screens.Settings}
        component={Settings}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
