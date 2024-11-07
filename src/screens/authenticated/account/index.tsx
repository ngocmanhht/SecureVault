import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { appStyles, Colors, FontSizes, Padding } from '../../../assets/styles';
import { Text } from '../../../components/text';
import { Divider, Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../const';
import { useQuery } from '@tanstack/react-query';
import { supabaseService } from '../../../supabase';
import moment from 'moment';

export const Account = () => {
  const navigation = useNavigation();
  const { data } = useQuery({
    queryKey: ['getProfile'],
    queryFn: async () => {
      return supabaseService.getUserData();
    },
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        padding: Padding.screen,
        gap: 30,
      }}>
      <View
        style={[
          { padding: 15, gap: 15, marginTop: 15 },
          appStyles.shadowStyle,
        ]}>
        <View style={{ gap: 5 }}>
          <Text>Tên tài khoản</Text>
          <Text style={{ fontSize: FontSizes.sm }}>{data?.email ?? '-'}</Text>
        </View>
        <Divider />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>Loại tài khoản</Text>
          <Text>Premium Trial</Text>
        </View>
        <Divider />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>Ngày tạo</Text>
          <Text>{moment(data?.created_at).format('HH:MM DD/MM/YYYY')}</Text>
        </View>
        <Divider />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: Colors.red }}>Hết hạn dùng thử</Text>
          <Text style={{ color: Colors.red }}>10/10/2025</Text>
        </View>
        <Divider />

        <TouchableOpacity>
          <Text style={{ color: Colors.primary }}>Nâng cấp lên Premium</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate(Screens.ChangePassword as never);
        }}
        style={[{ padding: 15 }, appStyles.shadowStyle]}>
        <Text style={{ color: Colors.primary }}>Thay đổi mật khẩu chính</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          { padding: 10, flexDirection: 'row', gap: 15, alignItems: 'center' },
          appStyles.shadowStyle,
        ]}>
        <Icon size={25} source={'delete-forever'} color={Colors.red} />
        <Text style={{ color: Colors.red }}>Xóa tài khoản vĩnh viễn</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});
