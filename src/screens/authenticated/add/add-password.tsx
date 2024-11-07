import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { Divider, Icon, Switch } from 'react-native-paper';
import { appStyles, Colors, FontSizes } from '../../../assets/styles';
import { Text } from '../../../components/text';
import { CustomTextInput } from '../../../components/text-input';
import { LongButton } from '../../../components/long-button';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../const';
import { IPassword } from '../../../type/password';
import { supabaseService } from '../../../supabase';
import { useMutation } from '@tanstack/react-query';
import useCustomToast from '../../../hooks/use-toast';
import { Controller, useForm } from 'react-hook-form';
import { NoteType } from '../../../type/note';
import { aesService } from '../../../ultils/aes';
export const AddPassword = ({ initialValue }: { initialValue?: IPassword }) => {
  const data = [
    { label: 'Facebook', value: 'Facebook', icon: 'facebook' },
    { label: 'Google', value: 'Google', icon: 'google' },
    { label: 'Twitter', value: 'Twitter', icon: 'twitter' },
    { label: 'Instagram', value: 'Instagram', icon: 'instagram' },
    { label: 'Linkedin', value: 'Linkedin', icon: 'linkedin' },
    { label: 'Github', value: 'Github', icon: 'github' },
    { label: 'Gitlab', value: 'Gitlab', icon: 'gitlab' },
    { label: 'Jira', value: 'Jira', icon: 'jira' },
    { label: 'Other', value: 'Other', icon: 'note-text' },
  ];
  const navigation = useNavigation();
  // const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [item, setItem] = useState<any>();

  const {
    watch,
    control,
    getValues,
    handleSubmit,
    setValue,
    formState: { isDirty },
  } = useForm<IPassword>({
    defaultValues: {
      isRequireMasterPassword: false,
      isEncrypt: false,
    },
  });
  const getColors = (label: string) => {
    switch (label) {
      case 'Facebook':
        return Colors.blueA700;
      case 'Google':
        return Colors.primary;
      case 'Twitter':
        return Colors.primary;
      case 'Instagram':
        return Colors.orange600;
      case 'Linkedin':
        return Colors.primary;
      case 'Github':
        return 'black';
      case 'Gitlab':
        return Colors.orange500;
      case 'Jira':
        return Colors.primary;
      case 'Other':
        return Colors.cyan600;
      default:
        return Colors.gray500;
    }
  };

  const toast = useCustomToast();
  const addPasswordMutation = useMutation({
    mutationFn: (data: IPassword) => supabaseService.createNewNote(data),
    onSuccess: () => {
      toast.show({
        type: 'success',
        title: 'Tạo thành công',
        content: '',
      });
      navigation.navigate(Screens.Vault as never);
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (data: IPassword) =>
      supabaseService.updateNote(data, initialValue?.id),
    onSuccess: () => {
      toast.show({
        type: 'success',
        title: 'Sửa thành công',
        content: '',
      });
      navigation.navigate(Screens.Vault as never);
    },
  });

  const onSubmit = async (data: IPassword) => {
    const uid = await supabaseService.getUid();

    const body: IPassword = {
      ...data,
      userid: uid,
      noteType: NoteType.Password,
    };
    if (data.isEncrypt) {
      const iv = await aesService.generateIv();
      const aa = await aesService.encryptData(body.userName, iv);
      body.iv = iv;
      body.userName = aa;
      body.password = await aesService.encryptData(body.password, iv);
      if (!!data.notes) {
        body.notes = await aesService.encryptData(data.notes, iv);
      }
    }
    if (!!initialValue) {
      updatePasswordMutation.mutate(body);
      return;
    }
    addPasswordMutation.mutate(body);
  };

  const setInitialValue = async () => {
    if (!!initialValue) {
      for (const [key, value] of Object.entries(initialValue)) {
        if (
          initialValue.isEncrypt &&
          (key === 'userName' || key === 'password' || key === 'notes')
        ) {
          const decryptedValue = await aesService.decryptData(
            value,
            initialValue.iv as string,
          );
          setValue(key as any, decryptedValue, {
            shouldDirty: false,
          });
        } else {
          setValue(key as any, value, {
            shouldDirty: false,
          });
        }

        const item = data.find(i => i.label === initialValue?.typeAccount);
        !!item && setItem(item);
      }
    }
  };
  useEffect(() => {
    setInitialValue();
  }, [initialValue]);
  return (
    <View style={{ gap: 20 }}>
      <View
        style={[
          {
            gap: 10,
            borderRadius: 10,
            padding: 10,
            backgroundColor: Colors.white,
            paddingVertical: 15,
          },
          appStyles.shadowStyle,
        ]}>
        <Text style={styles.titleText}>Chọn loại tài khoản</Text>

        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          searchField='label'
          renderItem={({ label, value, icon }) => (
            <View style={{ padding: 10, gap: 5 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                {!!icon && (
                  <Icon color={getColors(label)} size={25} source={icon} />
                )}
                <Text>{label}</Text>
              </View>
              <Divider />
            </View>
          )}
          labelField='label'
          valueField='value'
          placeholder={!isFocus ? 'Chọn tài khoản' : '...'}
          searchPlaceholder='Tìm kiếm...'
          value={watch('typeAccount')}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setItem(item);
            setValue('typeAccount', item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <Icon
              size={20}
              color={getColors(item?.label)}
              source={item?.icon || 'account'}
            />
          )}
        />
      </View>

      <View
        style={[
          {
            gap: 15,
            borderRadius: 10,
            padding: 10,
            paddingVertical: 15,
            backgroundColor: Colors.white,
          },
          appStyles.shadowStyle,
        ]}>
        <View>
          <Text style={styles.titleText}>Url</Text>
          <Controller
            control={control}
            name='url'
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                containerStyle={{
                  paddingVertical: 1,
                  width: '100%',
                  marginTop: 5,
                  borderRadius: 8,
                }}
                value={value}
                onTextChange={e => {
                  onChange(e);
                }}
              />
            )}
          />
        </View>

        <View>
          <Text style={styles.titleText}>Tên đăng nhập</Text>
          <Controller
            control={control}
            name='userName'
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                containerStyle={{
                  paddingVertical: 1,
                  width: '100%',
                  marginTop: 5,
                  borderRadius: 8,
                }}
                value={value}
                onTextChange={e => {
                  onChange(e);
                }}
              />
            )}
          />
        </View>

        <View>
          <Text style={styles.titleText}>Mật khẩu</Text>
          <Controller
            control={control}
            name='password'
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                containerStyle={{
                  paddingVertical: 1,
                  width: '100%',
                  marginTop: 5,
                  borderRadius: 8,
                }}
                isPassword
                value={value}
                onTextChange={e => {
                  onChange(e);
                }}
              />
            )}
          />
        </View>
      </View>

      <View
        style={[
          {
            gap: 15,
            borderRadius: 10,
            padding: 10,
            paddingVertical: 15,
            backgroundColor: Colors.white,
          },
          appStyles.shadowStyle,
        ]}>
        <View>
          <Text style={styles.titleText}>Ghi chú</Text>

          <Controller
            control={control}
            name='notes'
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                containerStyle={{
                  paddingVertical: 1,
                  width: '100%',
                  marginTop: 5,
                  borderRadius: 8,
                }}
                value={value}
                onTextChange={e => {
                  onChange(e);
                }}
              />
            )}
          />
        </View>
      </View>

      <View
        style={[
          {
            gap: 15,
            borderRadius: 10,
            padding: 10,
            paddingVertical: 15,
          },
          appStyles.shadowStyle,
        ]}>
        <View>
          <Text style={styles.titleText}>Tùy chọn</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 10,
              gap: 10,
            }}>
            <View style={{ flex: 1, gap: 5 }}>
              <Text>Nhắc lại master password</Text>
              <Text
                style={{
                  fontSize: FontSizes.sm,
                  color: Colors.gray500,
                }}>
                Yêu cầu mật khẩu chính của bạn khi bạn điền, sao chép hoặc chỉnh
                sửa tên người dùng hoặc mật khẩu của mình.
              </Text>
            </View>
            <View style={{ alignSelf: 'center' }}>
              <Switch
                value={!!watch('isRequireMasterPassword')}
                onValueChange={val => {
                  setValue('isRequireMasterPassword', val);
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 10,
              gap: 10,
            }}>
            <View style={{ flex: 1, gap: 5 }}>
              <Text>Mã hóa thông tin của bạn</Text>
              <Text
                style={{
                  fontSize: FontSizes.sm,
                  color: Colors.gray500,
                }}>
                Secure Vault sẽ mã hóa các thông tin nhạy cảm của bạn trước khi
                lưu trữ vào hệ thống. Và thông tin này chỉ có bạn biết
              </Text>
            </View>
            <View style={{ alignSelf: 'center' }}>
              <Switch
                value={!!watch('isEncrypt')}
                onValueChange={val => {
                  setValue('isEncrypt', val);
                }}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={{ paddingVertical: 10, zIndex: 999999999 }}>
        <LongButton
          disable={!isDirty}
          buttonColor={isDirty ? Colors.primary : Colors.gray600}
          textColor={Colors.white}
          title='Lưu'
          onPress={handleSubmit(onSubmit)}
          buttonStyle={{
            width: '100%',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  titleText: {
    fontWeight: 'bold',
    color: Colors.gray500,
    fontSize: FontSizes.sm,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: FontSizes.sm,
  },
  placeholderStyle: {
    fontSize: FontSizes.content,
    marginLeft: 10,
  },
  selectedTextStyle: {
    fontSize: FontSizes.content,
    marginLeft: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: FontSizes.sm,
    borderRadius: 10,
  },
});
