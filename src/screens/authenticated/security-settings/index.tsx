import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
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
import { observer } from 'mobx-react';
import SessionStore from '../../../stores/session';
import useStores from '../../../hooks/use-stores';
export const SecuritySettings = observer(() => {
  const navigation = useNavigation();
  const onOptionsPress = (option: OptionType) => {
    navigation.navigate({
      name: Screens.Options,
      params: {
        optionType: option,
      },
    } as never);
  };
  const sessionStore: SessionStore = useStores().sessionStore;
  const { autoLogoutTime, autoClearClipBoard, lockOption, skipPrompt } =
    sessionStore.settings;
  const convertMsToMinutes = (ms: number) => {
    const minutes = (ms / 60000).toFixed(0);
    return `${minutes} phút`;
  };
  const logOutTime = useMemo(() => {
    if (autoLogoutTime === 0) {
      return 'Không bao giờ';
    }
    return convertMsToMinutes(autoLogoutTime);
  }, [autoLogoutTime]);

  const clearClipBoardTime = useMemo(() => {
    if (autoClearClipBoard === 0) {
      return 'Không bao giờ';
    }
    return convertMsToMinutes(autoClearClipBoard);
  }, [autoClearClipBoard]);

  const lockOptionsTime = useMemo(() => {
    if (lockOption === 0) {
      return 'Không bao giờ';
    }
    return convertMsToMinutes(lockOption);
  }, [lockOption]);

  const skipPromptTime = useMemo(() => {
    if (skipPrompt === 0) {
      return 'Không bao giờ';
    }
    return convertMsToMinutes(skipPrompt);
  }, [skipPrompt]);

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
                  await asyncStorageService.setIsUseFaceID(
                    !!isUseFaceID ? false : true,
                  );
                  refetch();
                }
              } catch (error: any) {
                console.log('error in face id', error);
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
        <Switch
          value={isUseFaceID}
          onValueChange={async value => {
            if (value) {
              try {
                const response = await TouchId.authenticate(
                  'to demo this react-native component',
                );
                if (!!response) {
                  await asyncStorageService.setIsUseFaceID(
                    !!isUseFaceID ? false : true,
                  );
                  refetch();
                }
              } catch (error: any) {
                console.log('error in face id', error);
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
            <Text>{lockOptionsTime}</Text>
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
          <Text style={{ flex: 1 }}>Bỏ qua nhắc nhở sau khi đăng nhập</Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <Text style={{ textAlign: 'right' }}>{skipPromptTime}</Text>
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
            <Text>{logOutTime}</Text>
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
            <Text>{clearClipBoardTime}</Text>
            <Icon size={20} source={'arrow-right'} color={Colors.gray500} />
          </View>
        </TouchableOpacity>
        <Divider />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({});
