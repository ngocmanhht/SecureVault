import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { appStyles, Colors, FontSizes, Padding } from '../../../assets/styles';
import { Checkbox, TextInput } from 'react-native-paper';
import { LongButton } from '../../../components/long-button';

export const ChangePassword = () => {
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
            value='doananhngoc5666@gmail.com'
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
          <TextInput
            style={{
              backgroundColor: Colors.gray100,
              paddingVertical: 0,
              margin: 0,
            }}
            theme={{
              colors: {
                placeholder: Colors.gray500,
                primary: Colors.primary,
              },
            }}
            label='Mật khẩu cũ'
          />
        </View>

        <View style={{ paddingHorizontal: 15 }}>
          <TextInput
            style={{
              backgroundColor: Colors.gray100,
              paddingVertical: 0,
              margin: 0,
            }}
            theme={{
              colors: {
                placeholder: Colors.gray500,
                primary: Colors.primary,
              },
            }}
            label='Mật khẩu mới'
          />
        </View>

        <View style={{ paddingHorizontal: 15 }}>
          <TextInput
            style={{
              backgroundColor: Colors.gray100,
              paddingVertical: 0,
              margin: 0,
            }}
            theme={{
              colors: {
                placeholder: Colors.gray500,
                primary: Colors.primary,
              },
            }}
            label='Nhập lại mật khẩu mới'
          />
        </View>
        <View style={{ paddingHorizontal: 15, marginTop: 5 }}>
          <Text style={{ color: Colors.gray600 }}>
            Yêu cầu tối thiếu đối với mật khẩu
          </Text>

          <CheckBoxWithLabel title='Ít nhất 12 kí tự' status='checked' />
          <CheckBoxWithLabel title='Ít nhất 1 kí tự số' status='checked' />
          <CheckBoxWithLabel title='Ít nhất 1 chữ thường' status='checked' />
          <CheckBoxWithLabel title='Ít nhất 1 chữ hoa' status='checked' />
          <CheckBoxWithLabel
            title='Ít nhất 1 kí tự đặc biệt'
            status='checked'
          />
          <CheckBoxWithLabel
            title='Không phải email của bạn'
            status='checked'
          />
        </View>
        <LongButton
          buttonColor={Colors.primary}
          textColor={Colors.white}
          title='Cập nhật'
          onPress={() => {}}
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
