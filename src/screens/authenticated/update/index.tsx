import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import { images } from '../../../assets/images';
import { Icons } from '../../../assets/icons/const';
import {
  Colors,
  FontSizes,
  sizeHeight,
  sizeWidth,
} from '../../../assets/styles';
import { Text } from '../../../components/text';
import { LongButton } from '../../../components/long-button';

const Update = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <ImageBackground
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: sizeHeight(50),
        }}
        source={images.UpdateBackground}>
        <View
          style={{
            padding: 10,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={Icons.Plane}
            style={{
              width: 100,
              height: undefined,
              aspectRatio: 1,
            }}
          />
          <Text
            style={{
              color: Colors.white,
              fontSize: FontSizes.xxxl,
              alignSelf: 'center',
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            Yên tâm. {'\n'} Bất cứ nơi nào bạn đi.
          </Text>
          <Text
            style={{
              color: Colors.white,
              marginTop: 10,
            }}>
            Khám phá Premium ngay hôm nay.
          </Text>
        </View>
      </ImageBackground>
      <ScrollView
        style={{
          backgroundColor: '#E3E4F8',
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          position: 'absolute',
          width: sizeWidth(85),
          alignSelf: 'center',
          top: sizeHeight(40),
          maxHeight: 350,
        }}
        contentContainerStyle={{
          padding: 10,
        }}>
        <Item
          icon={Icons.Computer}
          title={'Thiết bị không giới hạn'}
          content={
            'Sử dụng SecureVault trên tất cả máy tính và thiết bị di động của bạn.'
          }
        />
        <Item
          icon={Icons.Share}
          title={'Chia sẻ an toàn, dễ dàng'}
          content={'Chia sẻ mật khẩu, ghi chú và các mục khác với nhiều người.'}
        />
        <Item
          icon={Icons.Access}
          title={'Truy cập khẩn cấp'}
          content={
            'Đảm bảo quyền truy cập vào tài khoản của bạn trong trường hợp khẩn cấp.'
          }
        />
        <Item
          icon={Icons.Technical}
          title={'Ưu tiên hỗ trợ kỹ thuật'}
          content={
            'Nhận câu trả lời nhanh chóng, mang tính cá nhân cho các câu hỏi của bạn về SecureVault.'
          }
        />
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          bottom: 5,
          width: sizeWidth(85),
        }}>
        <LongButton
          buttonStyle={{
            width: '100%',
          }}
          buttonColor={Colors.red}
          textColor={Colors.white}
          title='Đăng kí premium'
          onPress={() => {}}
        />
        <Text
          style={{
            color: '#424242',
            fontSize: FontSizes.sm,
            alignSelf: 'center',
          }}>
          Chỉ 839.000 đ / năm.
        </Text>
      </View>
    </View>
  );
};

export default Update;

const Item = ({
  icon,
  title,
  content,
}: {
  icon: ImageSourcePropType;
  title: string;
  content: string;
}) => {
  return (
    <View
      style={{
        padding: 10,
        flexDirection: 'row',
        gap: 10,
      }}>
      <Image
        style={{ width: 50, height: undefined, aspectRatio: 1 }}
        source={icon}
      />
      <View style={{ flex: 1, gap: 5 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: '#424242',
  },
  content: {
    color: '#424242',
    fontSize: FontSizes.content,
  },
});
