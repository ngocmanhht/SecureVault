/* eslint-disable react/react-in-jsx-scope */
import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '../../const';
import BottomTabs from './bottom-tab';
import { AddNewItem } from '../../screens/authenticated/add-item';
import { fontSize, FontSizes } from '../../assets/styles';
import { useQuery } from '@tanstack/react-query';
import { observer } from 'mobx-react';
import SessionStore from '../../stores/session';
import useStores from '../../hooks/use-stores';
import { useEffect } from 'react';
import { supabaseService } from '../../supabase';
import Clipboard from '@react-native-clipboard/clipboard';

const Stack = createStackNavigator();
export const AuthenticatedNavigator = observer(() => {
  const sessionStore: SessionStore = useStores().sessionStore;
  const { autoLogoutTime, autoClearClipBoard } = sessionStore.settings;
  const { refetch: logOut } = useQuery({
    queryKey: ['autoLogOutTime'],
    queryFn: async () => {
      console.log('lohOut1');
      await supabaseService.logOut();
      return true;
    },
    refetchInterval: autoLogoutTime,
    enabled: false,
  });
  const { refetch: clearClipBoard } = useQuery({
    queryKey: ['autoClearClipBoard'],
    queryFn: async () => {
      console.log('lohOut1');
      Clipboard.setString('');
      return true;
    },
    refetchInterval: autoClearClipBoard,
    enabled: false,
  });

  useEffect(() => {
    if (autoLogoutTime === 0) {
      return;
    }

    const intervalLogOut = setInterval(() => {
      logOut();
    }, autoLogoutTime);

    return () => {
      clearInterval(intervalLogOut);
    };
  }, [autoLogoutTime]);

  useEffect(() => {
    if (autoClearClipBoard === 0) {
      return;
    }

    const intervalClearClipboard = setInterval(() => {
      clearClipBoard();
    }, autoClearClipBoard);

    return () => {
      clearInterval(intervalClearClipboard);
    };
  }, [autoClearClipBoard]);

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
});
