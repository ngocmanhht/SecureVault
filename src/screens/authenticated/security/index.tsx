import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { appStyles, Colors, FontSizes, Padding } from '../../../assets/styles';
import { Icons } from '../../../assets/icons/const';
import { Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../const';

const Security = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        padding: Padding.screen,
        gap: 20,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          padding: Padding.screen,
          gap: 20,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: FontSizes.xxxl,
          }}>
          Công cụ bảo mật
        </Text>

        <View style={{ flex: 1 }}>
          <ToolButton />
        </View>
      </View>
    </SafeAreaView>
  );
};

const ToolButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(Screens.GeneratePassword as never);
      }}
      style={[
        appStyles.shadowStyle,
        {
          padding: 15,
          borderRadius: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
        },
      ]}>
      <Image
        style={{ width: 40, height: undefined, aspectRatio: 1 }}
        source={Icons.Generate}
      />
      <View style={{ flex: 1, gap: 5 }}>
        <Text style={{ fontWeight: 'bold', fontSize: FontSizes.lg }}>
          Tạo mật khẩu
        </Text>
        <Text
          style={{
            fontSize: FontSizes.md,
            color: Colors.gray500,
          }}>
          Tạo mật khẩu mạnh và độc đáo
        </Text>
      </View>
      <Icon size={20} source={'arrow-right'} color={Colors.gray500} />
    </TouchableOpacity>
  );
};
export default Security;

const styles = StyleSheet.create({});
