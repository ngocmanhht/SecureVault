import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Text } from '../../../components/text';
import { TableName } from '../../../type/table';
import { Padding } from '../../../assets/styles/layout';
import { appStyles, Colors, FontSizes } from '../../../assets/styles';
import { Chip, Icon, Searchbar } from 'react-native-paper';
import { Link, useIsFocused, useNavigation } from '@react-navigation/native';
import { Screens } from '../../../const';
import { Icons } from '../../../assets/icons/const';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { TouchableWithoutFeedback } from 'react-native';
import { Item } from './item';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import { supabaseService } from '../../../supabase';
import { Note, NoteType } from '../../../type/note';
import { set } from 'mobx';
import { getColors, getMatchedItem } from './password-item';
import UIStore from '../../../stores/ui';
import useStores from '../../../hooks/use-stores';
import Clipboard from '@react-native-clipboard/clipboard';
import TouchID from 'react-native-touch-id';
import useCustomToast from '../../../hooks/use-toast';
import { aesService } from '../../../ultils/aes';
import { observer } from 'mobx-react';
import SessionStore from '../../../stores/session';
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
const Vault = observer(() => {
  const isFocused = useIsFocused();
  const [note, setNote] = useState<Note | null>(null);
  const [tabIndex, setTabIndex] = useState(1);
  const uiStore: UIStore = useStores().uiStore;
  const sessionStore: SessionStore = useStores().sessionStore;
  const filterTabTitle = useMemo(() => {
    switch (tabIndex) {
      case 2:
        return NoteType.Password;
      case 3:
        return NoteType.Note;
      case 4:
        return NoteType.Contact;
      case 5:
        return NoteType.BankAccount;
      default:
        return null;
    }
  }, [tabIndex]);

  const { data, isLoading, refetch } = useQuery<Note[]>({
    queryKey: ['fetchNotes', isFocused, filterTabTitle],
    queryFn: () => supabaseService.getAllData(TableName.Notes, filterTabTitle),
    enabled: isFocused,
  });
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

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => {
    if (note?.noteType === NoteType.Password) {
      return ['30%', '50%'];
    }
    return ['25%', '30%'];
  }, [note]);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.forceClose();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const deleteNoteMutation = useMutation({
    mutationKey: ['deleteNote'],
    mutationFn: (id: any) => supabaseService.deleteNote(id),
    onSuccess: () => {
      refetch();
    },
  });

  const promptEnterMasterPassword = (nameScreens: Screens, params: any) => {
    Alert.prompt(
      'Master password',
      'Hãy nhập master password để có thể xem chi tiết',
      async text => {
        const isEqual = await supabaseService.compareMasterPassword(text);
        if (isEqual) {
          navigation.navigate({
            name: nameScreens,
            params: params,
          } as never);
        } else {
          toast.show({
            type: 'error',
            title: 'Master password không đúng ',
            content: '',
          });
        }
      },
      'secure-text',
    );
  };
  const { autoLogoutTime } = sessionStore.settings;

  const onSeeDetailPress = async (nameScreens: Screens, params: any) => {
    const isSupported = await TouchID.isSupported();
    console.log('isSupported', isSupported);
    if (isSupported === 'FaceID' || isSupported === 'TouchID') {
      try {
        const response = await TouchID.authenticate();
        if (!!response) {
          navigation.navigate({
            name: nameScreens,
            params: params,
          } as never);
        } else {
          promptEnterMasterPassword(nameScreens, params);
        }
      } catch (error) {
        promptEnterMasterPassword(nameScreens, params);
      }
    } else {
      promptEnterMasterPassword(nameScreens, params);
    }
  };

  const toast = useCustomToast();
  const onDeletePress = async () => {
    try {
      const isSpFaceId = await TouchID.isSupported();
      if (isSpFaceId) {
        const response = await TouchID.authenticate();
        if (!!response) {
          Alert.alert('Cảnh báo', `Bạn có muốn xóa ?`, [
            {
              text: 'Hủy',
              style: 'cancel',
            },
            {
              text: 'Xóa',
              style: 'destructive',
              onPress: () => {
                deleteNoteMutation.mutate(note?.id);
              },
            },
          ]);
        }
      }
    } catch (error: any) {
      console.log('errr', error);
      toast.show({
        type: 'error',
        content: '',
        title: error || 'Error with Face ID',
      });
    }
  };
  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
        <TouchableWithoutFeedback
          onPress={() => {
            handleCloseModalPress();
          }}
          style={{
            backgroundColor: Colors.white,
            flex: 1,
          }}>
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
                style={styles.addNewNoteButton}>
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
                onIconPress={() => {}}
                value=''
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
                paddingHorizontal: Padding.screen,
                width: '100%',
              }}>
              {!!isLoading ? (
                <ActivityIndicator size='large' color={Colors.primary} />
              ) : (
                <FlatList
                  data={data}
                  contentContainerStyle={{ gap: 15 }}
                  style={{ flex: 1 }}
                  renderItem={({ item }) => (
                    <>
                      <Item
                        item={item}
                        onItemPress={() => {
                          handleCloseModalPress();
                          setNote(item);
                          setTimeout(() => {
                            handlePresentModalPress();
                          }, 1000);
                        }}
                      />
                    </>
                  )}
                  ListEmptyComponent={
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
                        style={{
                          width: 200,
                          height: undefined,
                          aspectRatio: 1,
                        }}
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
                  }
                />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onDismiss={() => {
          bottomSheetModalRef.current?.close();
        }}
        style={[
          { borderWidth: 2, borderColor: Colors.gray300 },
          appStyles.shadowStyle,
        ]}
        onChange={handleSheetChanges}>
        <BottomSheetView style={[styles.contentContainer]}>
          <View
            style={{
              flex: 1,
              width: '100%',
              padding: 10,
            }}>
            {note?.noteType === NoteType.Password && (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginBottom: 15,
                    gap: 10,
                  }}>
                  <Icon
                    size={35}
                    source={getMatchedItem(note as Note).icon}
                    color={getColors(note?.typeAccount as string)}
                  />
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: FontSizes.header,
                    }}>
                    {note?.typeAccount}
                  </Text>
                </View>
                <MButton
                  onPress={async () => {
                    if (note?.url && (await Linking.canOpenURL(note.url))) {
                      Linking.openURL(note.url);
                    }
                  }}
                  title='Mở'
                  rightIcon='launch'
                />
                <MButton
                  title='Copy username'
                  onPress={() => {
                    if (note?.userName) {
                      Clipboard.setString(note.userName);
                      handleCloseModalPress();
                      uiStore.showSnackBar({
                        content: note.userName,
                      });
                    }
                  }}
                  rightIcon='content-copy'
                />
                <MButton
                  title='Copy mật khẩu'
                  onPress={() => {
                    if (note?.password) {
                      Clipboard.setString(note.password);
                      handleCloseModalPress();
                      uiStore.showSnackBar({
                        content: note.password,
                      });
                    }
                  }}
                  rightIcon='content-copy'
                />
                <MButton
                  onPress={() => {
                    handleCloseModalPress();
                    const params = {
                      type: NoteType.Password,
                      item: note,
                    };
                    onSeeDetailPress(Screens.Add, params);
                  }}
                  title='Xem'
                  rightIcon='launch'
                />
                <MButton
                  onPress={() => {
                    handleCloseModalPress();
                    const params = {
                      type: NoteType.Password,
                      item: note,
                    };
                    onSeeDetailPress(Screens.Add, params);
                  }}
                  title='Sửa'
                  rightIcon='pencil'
                />
                <MButton title='Xem mật khẩu' rightIcon='eye' />
                <MButton
                  title='Xóa'
                  rightIcon='trash-can'
                  color={Colors.red700}
                  onPress={onDeletePress}
                />
              </>
            )}

            {note?.noteType === NoteType.Note && (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginBottom: 15,
                    gap: 10,
                  }}>
                  <Icon size={35} source={'note'} color={Colors.gray500} />
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: FontSizes.header,
                    }}>
                    {note?.title}
                  </Text>
                </View>
                <MButton
                  onPress={() => {
                    handleCloseModalPress();
                    const params = {
                      type: NoteType.Note,
                      item: note,
                    };
                    onSeeDetailPress(Screens.Add, params);
                  }}
                  title='Xem'
                  rightIcon='launch'
                />
                <MButton
                  onPress={() => {
                    handleCloseModalPress();
                    const params = {
                      type: NoteType.Note,
                      item: note,
                    };
                    onSeeDetailPress(Screens.Add, params);
                  }}
                  title='Sửa'
                  rightIcon='pencil'
                />
                <MButton
                  title='Xóa'
                  rightIcon='trash-can'
                  color={Colors.red700}
                  onPress={onDeletePress}
                />
              </>
            )}
            {note?.noteType === NoteType.BankAccount && (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginBottom: 15,
                    gap: 10,
                  }}>
                  <Icon
                    size={35}
                    source={'credit-card'}
                    color={Colors.yellow800}
                  />
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: FontSizes.header,
                    }}>
                    {note?.title}
                  </Text>
                </View>
                <MButton
                  onPress={() => {
                    handleCloseModalPress();
                    const params = {
                      type: NoteType.BankAccount,
                      item: note,
                    };
                    onSeeDetailPress(Screens.Add, params);
                  }}
                  title='Xem'
                  rightIcon='launch'
                />
                <MButton
                  onPress={() => {
                    handleCloseModalPress();
                    const params = {
                      type: NoteType.BankAccount,
                      item: note,
                    };
                    onSeeDetailPress(Screens.Add, params);
                  }}
                  title='Sửa'
                  rightIcon='pencil'
                />
                <MButton
                  title='Xóa'
                  rightIcon='trash-can'
                  color={Colors.red700}
                  onPress={onDeletePress}
                />
              </>
            )}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
});

const MButton = ({
  rightIcon,
  title,
  onPress,
  color = Colors.gray700,
}: {
  rightIcon: string;
  title: string;
  onPress?: () => void;
  color?: string;
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress && onPress();
      }}
      style={{
        flexDirection: 'row',
        gap: 10,
        padding: 10,
        alignItems: 'center',
      }}>
      <Icon size={25} color={color} source={rightIcon} />
      <Text
        style={{
          color: color,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
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
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  addNewNoteButton: {
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
  },
});
