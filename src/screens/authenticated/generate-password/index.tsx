import {
  NativeModules,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSizes, Padding } from '../../../assets/styles';
import { Header } from '@react-navigation/stack';
import { Icon, ProgressBar, Snackbar, Switch } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { LongButton } from '../../../components/long-button';
import {
  Password,
  PasswordGenerateOptions,
  PasswordStrength,
} from '../../../type/password';
import { PasswordUtils } from '../../../ultils/password';
import Clipboard from '@react-native-clipboard/clipboard';
import useCustomToast from '../../../hooks/use-toast';
import { Screens } from '../../../const';
import { Text } from '../../../components/text';
import { asyncStorageService } from '../../../service/async-storage';
import moment from 'moment';

export const GeneratePassword = () => {
  const navigation = useNavigation();
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>(
    PasswordStrength.Strong,
  );
  const [passwordLength, setPasswordLength] = useState(16);
  const [isUseLowerCase, setIsUseLowerCase] = useState(false);
  const [isUseUpperCase, setIsUseUpperCase] = useState(false);
  const [isUseNumber, setIsUseNumber] = useState(false);
  const [isRenew, setIsRenew] = useState(false);
  const toast = useCustomToast();
  const password = useMemo(() => {
    const options: PasswordGenerateOptions = {
      isUseLowerCase,
      isUseNumber,
      isUseUpperCase,
    };

    const passwordUtils = new PasswordUtils(options);
    const newPass = passwordUtils.generatePassword(passwordLength);

    const score = passwordUtils.evaluatePassword(newPass);
    setPasswordStrength(score);
    return newPass;
  }, [isRenew, passwordLength, isUseLowerCase, isUseUpperCase, isUseNumber]);

  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(true);

  const onDismissSnackBar = () => setVisible(false);
  const onClipboardPress = async () => {
    Clipboard.setString(password);
    const passwords = await asyncStorageService.getGeneratedPasswordHistory();
    let newPasswords = [] as Array<Password>;
    if (!passwords.some(pass => pass.value === password)) {
      newPasswords = [
        ...passwords,
        {
          id: new Date().getTime(),
          createdAt: moment().toString(),
          value: password,
        },
      ];
      await asyncStorageService.setMasterPasswordHistory(newPasswords);
    }

    onToggleSnackBar();
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          passwordStrength === PasswordStrength.Strong
            ? Colors.green50
            : Colors.yellow100,
      }}>
      <View
        style={{
          paddingVertical: 10,
          flexDirection: 'row',
          paddingHorizontal: 5,
          backgroundColor:
            passwordStrength === PasswordStrength.Strong
              ? Colors.green50
              : Colors.yellow100,
        }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
            }}>
            <Icon size={20} color={Colors.gray500} source={'arrow-left'} />
            <Text
              style={{ color: Colors.gray500, fontSize: FontSizes.content }}>
              Quay lại
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: FontSizes.header,
            }}>
            Tạo mật khẩu
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          {/* <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{ color: Colors.gray500, fontSize: FontSizes.content }}>
              Tiếp
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>

      <View
        style={{
          padding: Padding.screen,
          gap: 20,
          paddingVertical: 20,
          backgroundColor:
            passwordStrength === PasswordStrength.Strong
              ? Colors.green50
              : Colors.yellow100,
        }}>
        <View style={{}}>
          <Text
            style={{
              fontSize: FontSizes.xxl,
              color: Colors.grey800,
            }}>
            {password}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: FontSizes.lg,
              alignSelf: 'center',
              color:
                passwordStrength === PasswordStrength.Strong
                  ? Colors.green900
                  : Colors.yellow900,
            }}>
            {passwordStrength === PasswordStrength.Strong
              ? 'Mạnh'
              : 'Trung bình'}
          </Text>
          <View style={{ flexDirection: 'row', gap: 15 }}>
            <TouchableOpacity
              onPress={() => {
                setIsRenew(!isRenew);
              }}>
              <Icon size={25} source={'refresh'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onClipboardPress}>
              <Icon size={25} source={'content-copy'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ProgressBar
        progress={passwordStrength === PasswordStrength.Strong ? 1 : 0.5}
        color={
          passwordStrength === PasswordStrength.Strong
            ? Colors.green900
            : Colors.yellow900
        }
      />

      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          padding: Padding.screen,
          paddingVertical: 25,
          gap: 20,
        }}>
        <View>
          <Text
            style={{
              color: Colors.gray500,
              fontSize: FontSizes.content,
            }}>
            Độ dài mật khẩu: {passwordLength} kí tự
          </Text>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={8}
            maximumValue={64}
            onValueChange={val => {
              const value = Math.floor(val);
              setPasswordLength(value);
            }}
            value={passwordLength}
            minimumTrackTintColor={Colors.primary}
            maximumTrackTintColor={Colors.gray500}
          />
        </View>

        <CustomSwitch
          title='Chữ thường (abc)'
          onValueChange={e => {
            setIsUseLowerCase(e);
          }}
          initialValue={isUseLowerCase}
        />

        <CustomSwitch
          title='Chữ in hoa (abc)'
          onValueChange={e => {
            setIsUseUpperCase(e);
          }}
          initialValue={isUseUpperCase}
        />
        <CustomSwitch
          title='Số (123)'
          onValueChange={e => {
            setIsUseNumber(e);
          }}
          initialValue={isUseNumber}
        />

        <CustomSwitch
          title='Ký hiệu ngẫu nhiên (!#$)'
          disabled
          initialValue
          onValueChange={e => console.log('e', e)}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Screens.PasswordHistory as never);
          }}
          style={{ padding: 10, alignSelf: 'center' }}>
          <Text
            style={{
              color: Colors.primary,
              fontSize: FontSizes.content,
            }}>
            {'Xem lịch sử mật khẩu'}
          </Text>
        </TouchableOpacity>
      </View>
      <Snackbar
        style={{
          width: '60%',
          alignSelf: 'center',
        }}
        visible={visible}
        duration={1000}
        onDismiss={onDismissSnackBar}>
        <Text
          style={{
            color: Colors.white,
            textAlign: 'center',
          }}>
          Đã lưu vào clipboard
        </Text>
        <Text
          style={{
            color: Colors.white,
            textAlign: 'center',
          }}
          numberOfLines={3}>
          {password}
        </Text>
      </Snackbar>
    </SafeAreaView>
  );
};

const CustomSwitch = ({
  title,
  initialValue,
  onValueChange,
  disabled = false,
}: {
  title: string;
  initialValue?: boolean;
  onValueChange: (val: boolean) => void;
  disabled?: boolean;
}) => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    !!initialValue && setChecked(initialValue);
  }, [initialValue]);

  useEffect(() => {
    onValueChange(checked);
  }, [checked]);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: Colors.gray500,
          fontSize: FontSizes.content,
        }}>
        {title}
      </Text>
      <Switch
        value={checked}
        onValueChange={val => {
          setChecked(val);
        }}
        disabled={disabled}
        color={Colors.green500}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
