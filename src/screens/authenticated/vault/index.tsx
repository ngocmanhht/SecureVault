import {
  FlatList,
  Image,
  SafeAreaView,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { Text } from '../../../components/text';
import { useSupabase } from '../../../hooks/use-supabase';
import { TableName } from '../../../type/table';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Padding, shadowStyle } from '../../../assets/styles/layout';
import { Colors, FontSizes } from '../../../assets/styles';
import { Chip, Icon, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../const';
import { images } from '../../../assets/images';
import { Icons } from '../../../assets/icons/const';

export const category = [
  {
    id: 1,
    name: 'Tất cả',
    icon: 'view-gallery-outline',
  },
  {
    id: 2,
    name: 'Mật khẩu',
    icon: 'shield-lock-outline',
  },
  {
    id: 3,
    name: 'Ghi chú',
    icon: 'note-outline',
  },
  {
    id: 4,
    name: 'Thông tin liên lạc',
    icon: 'contacts-outline',
  },
  {
    id: 5,
    name: 'Ngân hàng',
    icon: 'bank-outline',
  },
];
const Vault = () => {
  const { data, isLoading } = useSupabase(TableName.Test);
  const [tabIndex, setTabIndex] = useState(1);
  const navigation = useNavigation();

  const emptyData = useMemo(() => {
    switch (tabIndex) {
      case 1:
        return {
          imageSource: Icons.EmptyAll,
          header: 'Thêm kho đầu tiên của bạn',
          content:
            'Nhấn vào + Mới ở trên. Điền vào kho của bạn. Bảo mật cuộc sống kỹ thuật số của bạn.',
        };
      case 2:
        return {
          imageSource: Icons.EmptyPassword,
          header: 'Thêm mật khẩu',
          content:
            'Thêm mật khẩu bạn cần để truy cập các trang web, ứng dụng và dịch vụ yêu thích của bạn.',
        };
      case 3:
        return {
          imageSource: Icons.EmptyNote,
          header: 'Thêm ghi chú bảo mật',
          content:
            'Lưu trữ bất kỳ thông tin nào bạn cần để giữ an toàn và có thể truy cập được, bao gồm các tệp đính kèm và bản ghi âm giọng nói.',
        };
      case 4:
        return {
          imageSource: Icons.EmptyContacts,
          header: 'Thêm thông tin liên lạc',
          content:
            'Lưu địa chỉ và thông tin liên quan để bạn có thể điền vào biểu mẫu bằng một lần nhấn.',
        };
      case 5:
        return {
          imageSource: Icons.EmptyCreditCard,
          header: 'Thêm thẻ thanh toán',
          content:
            'SecureVault là cách an toàn để lưu và điền thẻ tín dụng và thông tin thanh toán khác, bao gồm ngày hết hạn và CVC.',
        };

      default:
        return {
          imageSource: Icons.EmptyAll,
          header: '',
          content: '',
        };
    }
  }, [tabIndex]);

  const onAddNewPress = () => {
    navigation.navigate(Screens.AddNewItem as never);
  };
  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
      <View
        style={{
          backgroundColor: Colors.white,
          flex: 1,
          justifyContent: 'center',
          padding: Padding.screen,
          gap: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: FontSizes.xxxl,
              alignSelf: 'center',
            }}>
            Kho
          </Text>
          <TouchableOpacity
            onPress={onAddNewPress}
            style={{
              backgroundColor: Colors.red,
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              paddingHorizontal: 15,
              alignContent: 'center',
              shadowColor: '#ff0000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.18,
              shadowRadius: 4.59,
              elevation: 5,
              gap: 5,
            }}>
            <Icon color={Colors.white} source={'plus'} size={20} />
            <Text
              style={{
                alignSelf: 'center',
                color: Colors.white,
                fontWeight: 'bold',
              }}>
              Mới
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }}>
          <Searchbar
            style={{
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#F1F3FD',
            }}
            placeholder='Tìm kiếm...'
            onIconPress={() => {
              console.log('1312');
            }}
            inputStyle={{ alignSelf: 'center' }}
          />
        </View>

        <FlatList
          data={category}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 5,
            maxHeight: 40,
          }}
          style={{ maxHeight: 40 }}
          renderItem={({ item }) => (
            <View style={{ maxWidth: 200, padding: 5 }}>
              <Chip
                style={[
                  { backgroundColor: Colors.white },
                  tabIndex === item.id ? styles.shadowStyle : {},
                ]}
                icon={item.icon}
                theme={{
                  colors: {
                    primary: Colors.gray500,
                  },
                }}
                onPress={() => {
                  console.log('Pressed');
                  setTabIndex(item.id);
                }}>
                {item.name}
              </Chip>
            </View>
          )}
          horizontal
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            padding: Padding.screen,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              padding: Padding.screen,
              gap: 20,
            }}>
            <Image
              style={{ width: 200, height: undefined, aspectRatio: 1 }}
              resizeMode='contain'
              source={emptyData.imageSource}
            />
            <View
              style={{
                gap: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: FontSizes.header,
                }}>
                {emptyData.header}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: FontSizes.md,
                  color: Colors.gray500,
                }}>
                {emptyData.content}
              </Text>
            </View>
          </View>

          {/* <FlatList
            data={data}
            contentContainerStyle={{ flex: 1 }}
            renderItem={({ item }) => <Text>{item?.created_at}</Text>}
            ListEmptyComponent={
              isLoading ? <Text>Loading</Text> : <Text>Empty</Text>
            }
            style={{ borderWidth: 1, flex: 1 }}
          /> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Vault;

const styles = StyleSheet.create({
  shadowStyle: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
