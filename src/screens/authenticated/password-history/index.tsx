import {
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { appStyles, Colors, FontSizes, Padding } from '../../../assets/styles';
import { Text } from '../../../components/text';
import { Icon, Snackbar } from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';
import { useQuery } from '@tanstack/react-query';
import { asyncStorageService } from '../../../service/async-storage';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';

const PasswordHistory = () => {
  const [password, setPassword] = useState('');
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(true);

  const onDismissSnackBar = () => setVisible(false);
  const isFocused = useIsFocused();
  const { data } = useQuery({
    queryKey: ['getPasswordHistory', isFocused],
    queryFn: () => asyncStorageService.getGeneratedPasswordHistory(),
    enabled: isFocused,
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <View style={{ flex: 1, marginTop: 5 }}>
        <View
          style={{
            padding: Padding.screen,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: FontSizes.header,
            }}>
            Mới nhất
          </Text>

          <TouchableOpacity
            onPress={() => {
              Alert.alert('Cảnh báo', 'Bạn có muốn xóa lịch sử mật khẩu?', [
                {
                  text: 'Hủy',
                  style: 'cancel',
                },
                {
                  text: 'Xóa',
                  style: 'destructive',
                  onPress: async () => {
                    await asyncStorageService.clearMasterPasswordHistory();
                  },
                },
              ]);
            }}>
            <Icon size={25} color={Colors.primary} source={'delete-outline'} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          style={{ flex: 1 }}
          contentContainerStyle={{
            gap: 10,
            paddingTop: 15,
            padding: Padding.screen,
            flex: 1,
          }}
          ListEmptyComponent={() => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                gap: 10,
              }}>
              <Icon color={Colors.primary} size={80} source={'history'} />
              <View
                style={{
                  alignItems: 'center',
                  gap: 5,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: FontSizes.header,
                  }}>
                  Không có lịch sử có sẵn
                </Text>
                <Text
                  style={{
                    fontSize: FontSizes.content,
                    color: Colors.gray500,
                  }}>
                  Mật khẩu được generate sẽ xuất hiện ở đây
                </Text>
              </View>
            </View>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(item.value);
                setPassword(item.value);
                onToggleSnackBar();
              }}
              style={[
                {
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                },
                appStyles.shadowStyle,
              ]}>
              <View style={{ gap: 5 }}>
                <Text style={{ fontSize: FontSizes.content }}>
                  {item.value ?? ''}
                </Text>
                <Text style={{ fontSize: FontSizes.content }}>
                  {moment(item.createdAt).format('HH:mm DD/MM//YYYY')}
                </Text>
              </View>
              <Icon color={Colors.primary} size={25} source={'content-copy'} />
            </TouchableOpacity>
          )}
        />
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

export default PasswordHistory;

const styles = StyleSheet.create({});
