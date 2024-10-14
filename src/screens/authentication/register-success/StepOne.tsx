import { Image, View } from 'react-native';
import React from 'react';
import { images } from '../../../assets/images';
import { Text } from '../../../components/text';
import { FontSizes } from '../../../assets/styles';
export const StepOne = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={images.Goal}
        style={{ width: 220, height: undefined, aspectRatio: 1 }}
      />
      <Text
        style={{
          textAlign: 'center',
          fontSize: FontSizes.lg,
          lineHeight: FontSizes.lg * 1.5,
        }}>
        Tuyệt vời!{'\n'}Tài khoản của bạn đã được tạo
      </Text>
    </View>
  );
};
