import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  SafeAreaView,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Text } from '../../../components/text';
import { useSupabase } from '../../../hooks/use-supabase';
import { TableName } from '../../../type/table';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Padding, shadowStyle } from '../../../assets/styles/layout';
import { appStyles, Colors, FontSizes } from '../../../assets/styles';
import { Chip, Divider, Icon, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../const';
import { images } from '../../../assets/images';
import { Icons } from '../../../assets/icons/const';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { TouchableWithoutFeedback } from 'react-native';
import { Item } from './item';
import { useQuery } from '@tanstack/react-query';
import { supabaseService } from '../../../supabase';
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
  // const { data, isLoading } = useSupabase(TableName.Test);

  const { data, isLoading } = useQuery({
    queryKey: ['fetchNotes'],
    queryFn: () => supabaseService.getAllData(TableName.Password),
  });
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

  const [isVisible, setIsVisible] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['30%', '46%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.forceClose();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  return (
    <BottomSheetModalProvider>
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

                          setTimeout(() => {
                            handlePresentModalPress();
                          }, 500);
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
                marginBottom: 15,
              }}>
              <Icon size={35} source={'facebook'} color={Colors.primary} />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: FontSizes.header,
                }}>
                Facebook
              </Text>
            </View>

            <MButton title='Copy username' rightIcon='content-copy' />
            <MButton title='Copy mật khẩu' rightIcon='content-copy' />
            <MButton title='Xem' rightIcon='launch' />
            <MButton title='Sửa' rightIcon='pencil' />
            <MButton title='Xem mật khẩu' rightIcon='eye' />
            <MButton title='Xóa' rightIcon='trash-can' color={Colors.red700} />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

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
