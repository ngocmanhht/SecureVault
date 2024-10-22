import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { appStyles, Colors, Padding } from '../../../assets/styles';
import { Divider, Icon, Switch } from 'react-native-paper';
import { Text } from '../../../components/text';
import { OptionType } from '../../../type/options';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../const';
import { useQuery } from '@tanstack/react-query';
import { asyncStorageService } from '../../../service/async-storage';
import TouchId from 'react-native-touch-id';
import useCustomToast from '../../../hooks/use-toast';
export const SecuritySettings = () => {
  const navigation = useNavigation();
  const onOptionsPress = (option: OptionType) => {
    navigation.navigate({
      name: Screens.Options,
      params: {
        optionType: option,
      },
    } as never);
  };

  const toast = useCustomToast();

  const { data: isUseFaceID, refetch } = useQuery({
    queryKey: ['getISUseFaceId'],
    queryFn: () => asyncStorageService.getIsUseFaceID(),
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        padding: Padding.screen,
        gap: 20,
      }}>
      <View
        style={[
          {
            padding: 10,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          },
          appStyles.shadowStyle,
        ]}>
        <Text>Đăng nhập bằng Face ID</Text>
        <Switch
          value={isUseFaceID}
          onValueChange={async value => {
            if (value) {
              try {
                const response = await TouchId.authenticate(
                  'to demo this react-native component',
                );
                if (!!response) {
                  await asyncStorageService.setIsUseFaceID(value);
                  refetch();
                }
              } catch (error: any) {
                console.log('error', error);
                toast.show({
                  type: 'error',
                  content: 'Không hỗ trợ FaceID/TouchID',
                });
              }
            }
          }}
        />
      </View>

      <View
        style={[
          {
            padding: 10,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          },
          appStyles.shadowStyle,
        ]}>
        <Text>Mở khóa bằng Face ID</Text>
        <Switch />
      </View>

      <View
        style={[
          {
            padding: 10,
            gap: 10,
          },
          appStyles.shadowStyle,
        ]}>
        <TouchableOpacity
          onPress={() => {
            onOptionsPress(OptionType.Lock);
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text>Tùy chọn khóa</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Text>5 phút</Text>
            <Icon size={20} source={'arrow-right'} color={Colors.gray500} />
          </View>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          onPress={() => {
            onOptionsPress(OptionType.SkipReprompt);
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text>Bỏ qua nhắc nhở sau khi đăng nhập</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Text>5 phút</Text>
            <Icon size={20} source={'arrow-right'} color={Colors.gray500} />
          </View>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          onPress={() => {
            onOptionsPress(OptionType.AutoLogout);
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text>Tự động logout</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Text>5 phút</Text>
            <Icon size={20} source={'arrow-right'} color={Colors.gray500} />
          </View>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          onPress={() => {
            onOptionsPress(OptionType.ClearClipBoard);
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text>Xóa clipboard</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Text>5 phút</Text>
            <Icon size={20} source={'arrow-right'} color={Colors.gray500} />
          </View>
        </TouchableOpacity>
        <Divider />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
