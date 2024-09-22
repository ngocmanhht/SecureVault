import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { Divider, Icon, Portal, Switch, TextInput } from 'react-native-paper';
import { appStyles, Colors, FontSizes } from '../../../assets/styles';
import { Text } from '../../../components/text';
import { CustomTextInput } from '../../../components/text-input';
import { LongButton } from '../../../components/long-button';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../const';
export const AddPassword = () => {
  const data = [
    { label: 'Facebook', value: '1', icon: 'facebook' },
    { label: 'Google', value: '2', icon: 'google' },
    { label: 'Twitter', value: '3', icon: 'twitter' },
    { label: 'Instagram', value: '4', icon: 'instagram' },
    { label: 'Linkedin', value: '5', icon: 'linkedin' },
    { label: 'Github', value: '6', icon: 'github' },
    { label: 'Gitlab', value: '7', icon: 'gitlab' },
    { label: 'Jira', value: '8', icon: 'jira' },
    { label: 'Other', value: '9', icon: 'note-text' },
  ];
  const navigation = useNavigation();
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [item, setItem] = useState<any>();
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

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Loại tài khoản
        </Text>
      );
    }
    return null;
  };
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
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setItem(item);
            setValue(item.value);
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
          <CustomTextInput
            containerStyle={{
              paddingVertical: 1,
              width: '100%',
              marginTop: 5,
              borderRadius: 8,
            }}
            value=''
            onTextChange={() => {}}
          />
        </View>

        <View>
          <Text style={styles.titleText}>Tên đăng nhập</Text>
          <CustomTextInput
            containerStyle={{
              paddingVertical: 1,
              width: '100%',
              marginTop: 5,
              borderRadius: 8,
            }}
            value=''
            onTextChange={() => {}}
          />
        </View>

        <View>
          <Text style={styles.titleText}>Mật khẩu</Text>
          <CustomTextInput
            containerStyle={{
              paddingVertical: 1,
              width: '100%',
              marginTop: 5,
              borderRadius: 8,
            }}
            value=''
            onTextChange={() => {}}
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
          <CustomTextInput
            multiline={true}
            containerStyle={{
              paddingVertical: 1,
              width: '100%',
              marginTop: 5,
              borderRadius: 8,
            }}
            value=''
            onTextChange={() => {}}
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
                sửa tên người dùng và/hoặc mật khẩu của mình.
              </Text>
            </View>
            <View style={{ alignSelf: 'center' }}>
              <Switch />
            </View>
          </View>
        </View>
      </View>
      <View style={{ paddingVertical: 10, zIndex: 999999999 }}>
        <LongButton
          buttonColor={Colors.primary}
          textColor={Colors.white}
          title='Lưu'
          onPress={() => {
            console.log(12221);
            navigation.navigate(Screens.Vault as never);
          }}
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
