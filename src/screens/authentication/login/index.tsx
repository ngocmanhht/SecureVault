import {
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Text } from '../../../components/text';
import { DefaultPadding, FontSizes } from '../../../assets/styles/typography';
import { Icons } from '../../../assets/icons/const';
import { CustomTextInput } from '../../../components/text-input';
import { LongButton } from '../../../components/long-button';
import { Colors } from '../../../assets/styles';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../const';
import { Controller, useForm } from 'react-hook-form';
import { supabase } from '../../../ultils/supabase';
import { asyncStorageService } from '../../../service/async-storage';
import SessionStore from '../../../stores/session';
import useStores from '../../../hooks/use-stores';
import { useEffect } from 'react';
import useCustomToast from '../../../hooks/use-toast';
import { observer } from 'mobx-react';
import UIStore from '../../../stores/ui';

export const Login = observer(() => {
  const navigation = useNavigation();
  const sessionStore: SessionStore = useStores().sessionStore;
  const uiStore: UIStore = useStores().uiStore;

  const toast = useCustomToast();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const signInWithEmail = async (email: string, password: string) => {
    uiStore.showLoading();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    uiStore.hideLoading();
    if (data.user && data.session) {
      navigation.navigate(Screens.Authenticated as never);
    }
    if (error) {
      console.log('error', error);
      toast.show({
        type: 'error',
        title: error.message || 'Đăng nhập thất bại',
        content: '',
      });
    }
  };

  const onSubmit = (data: { email: string; password: string }) => {
    console.log(data);
    signInWithEmail(data.email, data.password);
  };

  const handleGetProfile = async () => {
    const value = await asyncStorageService.getProfile();
    if (value) {
      sessionStore.setUserProfile(value);
      navigation.navigate(Screens.Authenticated as never);
    }
  };

  useEffect(() => {
    handleGetProfile();
  }, []);

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View
          style={{
            flex: 1,
            gap: 30,
            alignContent: 'center',
            alignItems: 'center',
            marginTop: 40,
          }}>
          <Image
            style={{
              width: 100,
              height: undefined,
              aspectRatio: 1,
              resizeMode: 'contain',
              borderRadius: 20,
            }}
            source={Icons.Logo}
          />
          <View
            style={{
              alignContent: 'center',
              justifyContent: 'center',
              gap: 5,
            }}>
            <Text style={styles.header}>Chào mừng quay trở lại</Text>
            <Text
              style={[
                styles.header,
                { fontWeight: 'bold', fontSize: FontSizes.header },
              ]}>
              <Text style={[styles.header, { color: 'red' }]}>S</Text>
              <Text style={[styles.header]}>ecure</Text>
              <Text style={[styles.header, { color: 'red' }]}>V</Text>
              <Text style={[styles.header]}>ault</Text>
            </Text>
          </View>
          <View style={{ alignSelf: 'center', gap: 0 }}>
            <Controller
              control={control}
              name='email'
              rules={{
                required: 'Email là bắt buộc',
              }}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <View style={{ width: '100%', gap: 10 }}>
                  <CustomTextInput
                    iconBackgroundColor='#EEF8FF'
                    headerIcon={Icons.Mail}
                    placeholder='Nhập email'
                    onTextChange={onChange}
                    value={value}
                    onBlur={onBlur}
                  />
                  <Text style={{ textAlign: 'right', color: Colors.red }}>
                    {error?.message}
                  </Text>
                </View>
              )}
            />

            <Controller
              control={control}
              name='password'
              rules={{
                required: 'Mật khẩu là bắt buộc',
                minLength: {
                  value: 6,
                  message: 'Ít nhất 6 kí tự',
                },
              }}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <View style={{ width: '100%', gap: 10 }}>
                  <CustomTextInput
                    iconBackgroundColor='#F2FEF9'
                    headerIcon={Icons.Lock}
                    isPassword
                    placeholder='Nhập mật khẩu'
                    onTextChange={onChange}
                    value={value}
                    onBlur={onBlur}
                  />
                  <Text style={{ textAlign: 'right', color: Colors.red }}>
                    {error?.message}
                  </Text>
                </View>
              )}
            />

            <TouchableOpacity>
              <Text style={{ textAlign: 'right', color: Colors.red }}>
                Gặp vấn đề về đăng nhập?
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              gap: 15,
              width: '100%',
              marginTop: 30,
            }}>
            <LongButton
              buttonColor={Colors.red}
              textColor='white'
              onPress={handleSubmit(onSubmit)}
              title='Đăng nhập'
            />
            {/* <Text>Use Face ID</Text> */}
            <View style={{ gap: 5, flexDirection: 'row' }}>
              <Text>Chưa có tài khoản?</Text>
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                }}
                onPress={() => {
                  navigation.navigate(Screens.Register as never);
                }}>
                <Text
                  style={{
                    color: Colors.red,
                    textAlign: 'center',
                  }}>
                  Đăng kí ngay
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
});

const styles = StyleSheet.create({
  header: {
    fontSize: FontSizes.header * 1.25,
    textAlign: 'center',
  },
});
