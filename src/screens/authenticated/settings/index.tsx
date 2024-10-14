import React from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import SessionStore from '../../../stores/session';
import useStores from '../../../hooks/use-stores';
import { asyncStorageService } from '../../../service/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../const';
import { appStyles, Colors, FontSizes, Padding } from '../../../assets/styles';
import { Text } from '../../../components/text';
import { Divider, Icon } from 'react-native-paper';
import { supabaseService } from '../../../supabase';

export const Settings = () => {
  const sessionStore: SessionStore = useStores().sessionStore;
  const navigation = useNavigation();

  const showConfirmModal = () => {
    Alert.alert(
      'Đăng xuất khỏi SecureVault?',
      'Bạn sẽ không thể điền và lưu các trang web nếu bạn đăng xuất!',
      [
        {
          text: 'Đăng xuất',
          onPress: () => logOut(),
          style: 'destructive',
          isPreferred: true,
        },
        {
          text: 'Hủy',
          style: 'default',
        },
      ],
    );
  };
  const logOut = async () => {
    await supabaseService.logOut();
    await asyncStorageService.removeProfile();
    sessionStore.setUserProfile(undefined);
    navigation.reset({
      index: 0,
      routes: [{ name: Screens.Authentication as never }],
    });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={{ padding: Padding.screen, gap: 20 }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: FontSizes.header,
          }}>
          Cài đặt
        </Text>
        <View
          style={[
            { padding: 10, gap: 10, marginTop: 10 },
            appStyles.shadowStyle,
          ]}>
          <SettingButton
            onPress={() => navigation.navigate(Screens.Account as never)}
            leftIcon='account'
            title='Tài khoản'
          />
          <Divider />
          <SettingButton
            onPress={() =>
              navigation.navigate(Screens.SecuritySettings as never)
            }
            leftIcon='shield-check'
            title='Bảo mật'
          />
          <Divider />
          <SettingButton title='Hành động' leftIcon='cursor-default' />
          <Divider />
        </View>
        <TouchableOpacity
          onPress={showConfirmModal}
          style={[
            {
              padding: 10,
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              marginTop: 10,
            },
            appStyles.shadowStyle,
          ]}>
          <Icon size={25} source={'logout'} color={Colors.gray500} />
          <Text style={{ color: Colors.gray500 }}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const SettingButton = ({
  leftIcon,
  title,
  onPress,
}: {
  leftIcon: string;
  title: string;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress && onPress();
      }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Icon size={25} source={leftIcon} color={Colors.gray500} />
        <Text style={{ color: Colors.gray500 }}>{title}</Text>
      </View>
      <View>
        <Icon size={20} source={'arrow-right'} color={Colors.gray500} />
      </View>
    </TouchableOpacity>
  );
};
