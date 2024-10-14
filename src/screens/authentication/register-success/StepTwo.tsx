import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors, FontSizes, Padding } from '../../../assets/styles';
import { images } from '../../../assets/images';
import { Text } from '../../../components/text';
import { CheckBoxWithLabel } from '../register/components/check-box-with-label';
import { LongButton } from '../../../components/long-button';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../const';

const StepTwo = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Padding.screen,
        gap: 10,
      }}>
      <Image
        source={images.FaceId}
        style={{ width: 120, height: undefined, aspectRatio: 1 }}
        resizeMode='cover'
      />
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: FontSizes.lg,
        }}>
        Sử dụng FaceID như chìa khoá
      </Text>
      <View>
        <CheckBoxWithLabel
          title='Mở khoá kho của bạn trong tíc tắc'
          status='checked'
        />
        <CheckBoxWithLabel
          title='Khôi phục tài khoản nếu bạn quên mật khẩu Master'
          status='checked'
        />
      </View>
      <LongButton
        textColor='white'
        buttonColor={Colors.red}
        title='Sử dụng Face ID'
        onPress={() => {
          navigation.navigate(Screens.Login as never);
        }}
        buttonStyle={{
          width: '100%',
        }}
      />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate(Screens.Login as never);
        }}>
        <Text style={{ fontSize: FontSizes.md, color: '#425367' }}>
          Tôi sẽ làm sau
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: FontSizes.sm,
          color: Colors.gray400,
        }}>
        Dữ liệu của bạn sẽ có thể truy cập được với bất kỳ hồ sơ khuôn mặt nào
        được đăng ký trên thiết bị này
      </Text>
    </View>
  );
};

export default StepTwo;

const styles = StyleSheet.create({});
