import {
  Button,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from '../../../components/text';
import { useState } from 'react';
import { passwordUtils } from '../../../ultils/password';
import { Colors, Padding } from '../../../assets/styles';
import { DefaultPadding, FontSizes } from '../../../assets/styles/typography';
import { Controller, useForm } from 'react-hook-form';
import { CustomTextInput } from '../../../components/text-input';
import { Icons } from '../../../assets/icons/const';
import { LongButton } from '../../../components/long-button';

export const Register = () => {
  const [password, setPassword] = useState<String>('');
  const [passwordLength, setPasswordLength] = useState(12);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const generatePassword = () => {
    const newPass = passwordUtils.generatePassword(passwordLength);

    setPassword(newPass);
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
        <Text
          style={{
            fontSize: FontSizes.md,
          }}>
          Hãy bắt đầu nào
        </Text>
        <View style={{ gap: 0 }}>
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
        </View>

        <View style={{ gap: 10 }}>
          <LongButton
            buttonColor={Colors.red}
            textColor='white'
            onPress={() => {}}
            title='Tiếp theo'
          />
        </View>
      </ScrollView>

      {/* <Text>{password || 'Password'}</Text>

      <Button onPress={() => generatePassword()} title='Generate Password' /> */}
    </SafeAreaView>
  );
};
