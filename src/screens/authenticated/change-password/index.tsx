import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { appStyles, Colors, FontSizes, Padding } from '../../../assets/styles';
import { Checkbox, TextInput } from 'react-native-paper';
import { LongButton } from '../../../components/long-button';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { supabaseService } from '../../../supabase';
import { validatePassword } from '../../../ultils';
import { aesService } from '../../../ultils/aes';
import useCustomToast from '../../../hooks/use-toast';
import { useNavigation } from '@react-navigation/native';

export const ChangePassword = () => {
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      email: '',
      oldPassword: '',
      newPassword: '',
      reNewPassword: '',
    },
  });
  const { data } = useQuery({
    queryKey: ['getProfile'],
    queryFn: async () => {
      return supabaseService.getUserData();
    },
  });
  const password = watch('newPassword');
  const email = watch('email');
  const toast = useCustomToast();
  const navigation = useNavigation();
  const changePasswordMutation = useMutation({
    mutationFn: (password: string) => supabaseService.changePassword(password),
    onSuccess: async (data, password) => {
      await supabaseService.updateMasterPassword(password);
      toast.show({
        type: 'success',
        title: 'Cập nhật thành công',
        content: '',
      });
      navigation.goBack();
    },
  });
  const onSubmit = async (data: {
    email: string;
    oldPassword: string;
    newPassword: string;
    reNewPassword: string;
  }) => {
    console.log('data', data);
    const isMatchedPassword = await supabaseService.compareMasterPassword(
      data.oldPassword,
    );
    if (isMatchedPassword) {
      changePasswordMutation.mutate(data.newPassword);
    } else {
      toast.show({
        type: 'error',
        title: 'Mật khẩu của bạn không hợp lệ',
        content: '',
      });
    }
  };

  useEffect(() => {
    if (!!data && data?.email) {
      setValue('email', data.email);
    }
  }, [data]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        padding: Padding.screen,
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
        <Text style={{ color: Colors.gray500 }}>
          Hoàn thành biểu mẫu này để đặt mật khẩu chính mới
        </Text>

        <View style={{ paddingHorizontal: 15 }}>
          <TextInput
            style={{
              backgroundColor: Colors.gray100,
              paddingVertical: 0,
              margin: 0,
            }}
            editable={false}
            value={watch('email')}
            theme={{
              colors: {
                placeholder: Colors.gray500,
                primary: Colors.primary,
              },
            }}
            label='Email'
          />
        </View>

        <View style={{ paddingHorizontal: 15 }}>
          <Controller
            control={control}
            name='oldPassword'
            rules={{
              required: 'Hãy nhập mật khẩu cũ của bạn',
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  style={{
                    backgroundColor: Colors.gray100,
                    paddingVertical: 0,
                    margin: 0,
                  }}
                  value={value}
                  onChangeText={onChange}
                  theme={{
                    colors: {
                      placeholder: Colors.gray500,
                      primary: Colors.primary,
                    },
                  }}
                  label='Mật khẩu cũ'
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
            control={control}
            name='newPassword'
            rules={{
              required: 'Mật khẩu bắt buộc',
              validate: value =>
                validatePassword(value) || 'Hãy nhập mật khẩu đủ mạnh',
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  style={{
                    backgroundColor: Colors.gray100,
                    paddingVertical: 0,
                    margin: 0,
                  }}
                  value={value}
                  onChangeText={onChange}
                  theme={{
                    colors: {
                      placeholder: Colors.gray500,
                      primary: Colors.primary,
                    },
                  }}
                  label='Mật khẩu mới'
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
            control={control}
            name='reNewPassword'
            rules={{
              validate: values =>
                values === watch('newPassword') ||
                'Mật khẩu này phải trùng với mật khẩu ở trên',
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  style={{
                    backgroundColor: Colors.gray100,
                    paddingVertical: 0,
                    margin: 0,
                  }}
                  value={value}
                  onChangeText={onChange}
                  theme={{
                    colors: {
                      placeholder: Colors.gray500,
                      primary: Colors.primary,
                    },
                  }}
                  label='Nhập lại mật khẩu mới'
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
            status={/[^a-zA-Z0-9]/.test(password) ? 'checked' : 'indeterminate'}
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
        <LongButton
          buttonColor={Colors.primary}
          textColor={Colors.white}
          title='Cập nhật'
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

const CheckBoxWithLabel = ({
  title,
  status,
}: {
  title: string;
  status: 'indeterminate' | 'checked' | 'unchecked';
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Checkbox
        theme={{
          colors: {
            primary: Colors.primary,
          },
        }}
        status={status}
        onPress={() => {
          // setChecked(!checked);
        }}
      />
      <Text
        style={{
          color: Colors.gray500,
          fontSize: FontSizes.sm,
        }}>
        {title}
      </Text>
    </View>
  );
};
