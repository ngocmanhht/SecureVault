import {
  Button,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from '../../../components/text';
import React, { useState } from 'react';
import { appStyles, Colors, Padding } from '../../../assets/styles';
import { DefaultPadding, FontSizes } from '../../../assets/styles/typography';
import { Controller, useForm } from 'react-hook-form';
import { CustomTextInput } from '../../../components/text-input';
import { Icons } from '../../../assets/icons/const';
import { LongButton } from '../../../components/long-button';
import { Checkbox, TextInput } from 'react-native-paper';
import { CheckBoxWithLabel } from './components/check-box-with-label';
import { PasswordTextInput } from './components/password-text-input';
import { validateEmail, validatePassword } from '../../../ultils';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../const';
import { useMutation } from '@tanstack/react-query';
import { supabaseService } from '../../../supabase';

export const Register = () => {
  const { handleSubmit, control, getValues, watch } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rePassword: '',
    },
    mode: 'all',
  });
  const password = watch('password');
  const email = watch('email');
  const navigation = useNavigation();

  const registerMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      supabaseService.signUpWithEmail(email, password),
    onSuccess: () => {
      navigation.navigate(Screens.RegisterSuccess as never);
    },
  });

  const onSubmit = (value: {
    email: string;
    password: string;
    rePasswors: string;
  }) => {
    registerMutation.mutate({
      email: value.email,
      password: value.password,
    });
  };
  return (
    <SafeAreaView
      style={{
        padding: DefaultPadding,
        flex: 1,
      }}>
      <ScrollView
        style={{ flex: 1, padding: DefaultPadding, gap: 20 }}
        contentContainerStyle={{
          gap: 20,
        }}>
        <View
          style={[
            {
              flex: 1,
              padding: Padding.screen,
              gap: 10,
            },
            appStyles.shadowStyle,
          ]}>
          <Text style={{ color: Colors.gray500 }}>Hãy bắt đầu nào</Text>

          <View style={{ paddingHorizontal: 15 }}>
            <Controller
              control={control}
              name='email'
              rules={{
                required: 'Hãy nhập email',
                validate: value =>
                  validateEmail(value) || 'Hãy nhập email hợp lệ',
              }}
              render={({
                fieldState: { error },
                field: { value, onChange, onBlur },
              }) => (
                <>
                  <TextInput
                    style={{
                      backgroundColor: Colors.gray100,
                      paddingVertical: 0,
                      margin: 0,
                    }}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    // error
                    theme={{
                      colors: {
                        placeholder: Colors.gray500,
                        primary: Colors.primary,
                      },
                    }}
                    autoCapitalize='none'
                    label='Email'
                  />
                  {!!error && (
                    <Text
                      style={{
                        fontSize: FontSizes.xs,
                        marginTop: 5,
                        color: Colors.red,
                      }}>
                      {error.message}
                    </Text>
                  )}
                </>
              )}
            />
          </View>

          <View style={{ paddingHorizontal: 15 }}>
            <Controller
              name='password'
              control={control}
              rules={{
                required: 'Mật khẩu bắt buộc',
                validate: value =>
                  validatePassword(value) || 'Hãy nhập mật khẩu đủ mạnh',
              }}
              render={({
                fieldState: { error },
                field: { value, onChange, onBlur },
              }) => (
                <>
                  <PasswordTextInput
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    label='Mật khẩu'
                  />
                  {!!error && (
                    <Text
                      style={{
                        fontSize: FontSizes.xs,
                        marginTop: 5,
                        color: Colors.red,
                      }}>
                      {error.message}
                    </Text>
                  )}
                </>
              )}
            />
          </View>

          <View style={{ paddingHorizontal: 15 }}>
            <Controller
              name='rePassword'
              control={control}
              rules={{
                validate: values =>
                  values === watch('password') ||
                  'Mật khẩu này phải trùng với mật khẩu ở trên',
              }}
              render={({
                fieldState: { error },
                field: { value, onChange, onBlur },
              }) => (
                <>
                  <PasswordTextInput
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                    label='Nhập lại mật khẩu'
                  />
                  {!!error && (
                    <Text
                      style={{
                        fontSize: FontSizes.xs,
                        marginTop: 5,
                        color: Colors.red,
                      }}>
                      {error.message}
                    </Text>
                  )}
                </>
              )}
            />
          </View>
          <View style={{ paddingHorizontal: 15, marginTop: 5 }}>
            <Text style={{ color: Colors.gray600 }}>
              Yêu cầu tối thiếu đối với mật khẩu
            </Text>

            <CheckBoxWithLabel
              title='Ít nhất 12 kí tự'
              status={password.length >= 12 ? 'checked' : 'indeterminate'}
            />
            <CheckBoxWithLabel
              title='Ít nhất 1 kí tự số'
              status={/[0-9]/.test(password) ? 'checked' : 'indeterminate'}
            />
            <CheckBoxWithLabel
              title='Ít nhất 1 chữ thường'
              status={/[a-z]/.test(password) ? 'checked' : 'indeterminate'}
            />
            <CheckBoxWithLabel
              title='Ít nhất 1 chữ hoa'
              status={/[A-Z]/.test(password) ? 'checked' : 'indeterminate'}
            />
            <CheckBoxWithLabel
              title='Ít nhất 1 kí tự đặc biệt'
              status={
                /[^a-zA-Z0-9]/.test(password) ? 'checked' : 'indeterminate'
              }
            />
            <CheckBoxWithLabel
              title='Không phải email của bạn'
              status={
                !!password && !!email && password !== email
                  ? 'checked'
                  : 'indeterminate'
              }
            />
          </View>
        </View>

        <View style={{ gap: 10 }}>
          <LongButton
            buttonColor={Colors.red}
            textColor='white'
            onPress={handleSubmit(onSubmit)}
            title='Tiếp theo'
          />
        </View>
      </ScrollView>

      {/* <Text>{password || 'Password'}</Text>

      <Button onPress={() => generatePassword()} title='Generate Password' /> */}
    </SafeAreaView>
  );
};
