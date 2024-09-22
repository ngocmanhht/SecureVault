import {
  FlatList,
  SafeAreaView,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text } from '../../../components/text';
import { useSupabase } from '../../../hooks/use-supabase';
import { TableName } from '../../../type/table';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Padding, shadowStyle } from '../../../assets/styles/layout';
import { Colors, FontSizes } from '../../../assets/styles';
import { Chip, Icon, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../const';

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
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: Padding.screen,
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
        <View style={{ padding: Padding.screen }}>
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

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            padding: Padding.screen,
          }}>
          <FlatList
            data={category}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 5,
              maxHeight: 40,
            }}
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
          <FlatList
            data={data}
            contentContainerStyle={{ flex: 1 }}
            renderItem={({ item }) => <Text>{item?.created_at}</Text>}
            ListEmptyComponent={
              isLoading ? <Text>Loading</Text> : <Text>Empty</Text>
            }
            style={{ borderWidth: 1, flex: 1 }}
          />
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
