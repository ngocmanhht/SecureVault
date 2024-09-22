import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { appStyles, Colors } from '../../../assets/styles';
import { category } from '../vault';
import { Divider, Icon } from 'react-native-paper';
import { Text } from '../../../components/text';
import { ScrollView } from 'react-native-gesture-handler';
import { Screens } from '../../../const';
import { NoteType } from '../../../type/note';

export const AddNewItem = () => {
  const navigation = useNavigation();
  const firstCategory = [
    {
      id: 1,
      name: 'Mật khẩu',
      icon: 'shield-lock-outline',
      onPress: () => {
        navigation.navigate({
          name: Screens.Add,
          params: {
            type: NoteType.Password,
          },
        } as never);
      },
    },
    {
      id: 2,
      name: 'Ghi chú',
      icon: 'note-outline',
      onPress: () => {
        navigation.navigate({
          name: Screens.Add,
          params: {
            type: NoteType.Note,
          },
        } as never);
      },
    },
    {
      id: 3,
      name: 'Thông tin liên lạc',
      icon: 'contacts-outline',
      onPress: () => {
        navigation.navigate({
          name: Screens.Add,
          params: {
            type: NoteType.Contact,
          },
        } as never);
      },
    },
  ];

  const secondCategory = [
    {
      id: 4,
      name: 'Thẻ thanh toán',
      icon: 'credit-card',
    },
    {
      id: 5,
      name: 'Tài khoản ngân hàng',
      icon: 'bank',
      onPress: () => {
        navigation.navigate({
          name: Screens.Add,
          params: {
            type: NoteType.BankAccount,
          },
        } as never);
      },
    },
  ];

  const thirdCategory = [
    {
      id: 6,
      name: 'Bằng lái xe',
      icon: 'license',
    },
    {
      id: 7,
      name: 'Căn cước / Hộ chiếu',
      icon: 'passport',
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.gray500 }}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: Colors.gray100,
        }}
        contentContainerStyle={{
          padding: 10,
          paddingHorizontal: 20,
          gap: 20,
        }}>
        <View style={[{ padding: 10, marginTop: 10 }, appStyles.shadowStyle]}>
          <FlatList
            data={firstCategory}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={item.onPress}
                style={{
                  flexDirection: 'row',
                  paddingVertical: 10,
                  alignItems: 'center',
                  gap: 15,
                }}>
                <Icon color={Colors.gray500} size={20} source={item.icon} />
                <View
                  style={{
                    flex: 1,
                    gap: 5,
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}>
                  <Text style={{}}>{item.name}</Text>
                  <Divider />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={[{ padding: 10, marginTop: 10 }, appStyles.shadowStyle]}>
          <FlatList
            data={secondCategory}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  item.onPress && item.onPress();
                }}
                style={{
                  flexDirection: 'row',
                  paddingVertical: 10,
                  alignItems: 'center',
                  gap: 15,
                }}>
                <Icon color={Colors.gray500} size={20} source={item.icon} />
                <View
                  style={{
                    flex: 1,
                    gap: 5,
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}>
                  <Text style={{}}>{item.name}</Text>
                  <Divider />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
