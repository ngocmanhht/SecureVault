import React from 'react';
import { Button, SafeAreaView, Text } from 'react-native';
import SessionStore from '../../../stores/session';
import useStores from '../../../hooks/use-stores';
import { asyncStorageService } from '../../../service/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../const';

export const Settings = () => {
  const sessionStore: SessionStore = useStores().sessionStore;
  const navigation = useNavigation();
  const logOut = async () => {
    await asyncStorageService.removeProfile();
    sessionStore.setUserProfile(undefined);
    navigation.reset({
      index: 0,
      routes: [{ name: Screens.Authentication as never }],
    });
  };
  return (
    <SafeAreaView>
      <Text>Settings</Text>
      <Button onPress={logOut} title='Log Out' />
    </SafeAreaView>
  );
};
