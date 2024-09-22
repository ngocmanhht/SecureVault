import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Icon, Switch } from 'react-native-paper';
import { appStyles, Colors, FontSizes } from '../../../assets/styles';
import { CustomTextInput } from '../../../components/text-input';
import { LongButton } from '../../../components/long-button';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../const';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import useCustomToast from '../../../hooks/use-toast';
export const AddContact = () => {
  const [tabIndex, setTabIndex] = useState(1);
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, gap: 20 }}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 8,
            borderColor: Colors.green300,
            backgroundColor: Colors.green100,
          }}>
          <Icon color={Colors.green600} size={35} source={'contacts'} />
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <CustomTextInput
            containerStyle={{
              width: '100%',
              backgroundColor: '#EEF2FB',
              paddingVertical: 10,
            }}
            value=''
            onTextChange={() => {}}
          />
        </View>
      </View>
      <View
        style={{
          // padding: 10,
          width: '100%',
          flexDirection: 'row',
          // gap: 10,
          justifyContent: 'space-between',
          backgroundColor: Colors.gray200,
          borderRadius: 5,
        }}>
        <TouchableOpacity
          onPress={() => {
            tabIndex !== 1 && setTabIndex(1);
          }}
          style={[
            styles.typeButton,
            tabIndex === 1 ? appStyles.shadowStyle : {},
          ]}>
          <Icon color={'#425367'} size={20} source={'pencil-outline'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            tabIndex !== 2 && setTabIndex(2);
          }}
          style={[
            styles.typeButton,
            tabIndex === 2 ? appStyles.shadowStyle : {},
          ]}>
          <Icon color={'#425367'} size={20} source={'image-outline'} />
        </TouchableOpacity>
      </View>
      {tabIndex === 1 && <TextArea />}
      {tabIndex === 2 && <ImageArea />}

      <View style={{ paddingVertical: 10, zIndex: 999999999 }}>
        <LongButton
          buttonColor={Colors.primary}
          textColor={Colors.white}
          title='Lưu'
          onPress={() => {
            console.log(12221);
            navigation.navigate(Screens.Vault as never);
          }}
          buttonStyle={{
            width: '100%',
          }}
        />
      </View>
    </View>
  );
};

const ImageArea = React.memo(() => {
  const [images, setImages] = useState<Array<{ id: number; uri: string }>>([]);
  const takePhoto = async () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: false,
    };
    try {
      const result = await launchCamera(options);
      if (!!result) {
        console.log('result when take photo', result);
      }
    } catch (error) {
      console.log('error when take photo', error);
    }
  };

  const openLibrary = async () => {
    const limit = images.length === 5 ? 0 : 5 - images.length;
    const options: ImageLibraryOptions = {
      selectionLimit: limit,
      mediaType: 'photo',
      includeBase64: true,
      quality: 1,
    };
    try {
      const result = await launchImageLibrary(options);
      if (!!result && !!result.assets) {
        const imagesData = result.assets
          ?.map((asset, index) => {
            if (!!asset.base64)
              return {
                id: Math.random(),
                uri: `data:image/jpg;base64,${String(asset.base64)}`,
              };
          })
          .filter(item => item !== undefined);

        setImages([...images, ...imagesData]);

        console.log('result when launch library', imagesData);
      }
    } catch (error) {
      console.log('error when take photo', error);
    }
  };

  const onDeleteImagePress = (
    item: { uri: string; id: number },
    index: number,
  ) => {
    const newImages = images.filter(image => image.id !== item.id);
    setImages([...newImages]);
  };
  const toast = useCustomToast();
  return (
    <>
      <View
        style={[
          {
            gap: 50,
            borderRadius: 10,
            padding: 10,
            paddingVertical: 15,
            backgroundColor: Colors.white,
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection: 'row',
          },
          appStyles.shadowStyle,
        ]}>
        <TouchableOpacity onPress={takePhoto}>
          <Icon color={Colors.gray500} size={30} source={'camera'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (images.length === 5) {
              toast.show({
                type: 'error',
                title: 'Đã đạt tối đa số lượng ảnh',
                content: '',
              });
              return;
            } else {
              openLibrary();
            }
          }}>
          <Icon color={Colors.gray500} size={30} source={'image-outline'} />
        </TouchableOpacity>
      </View>
      {images.length > 0 && (
        <View style={{ flex: 1 }}>
          <FlatList
            horizontal
            data={images}
            // style={{ borderWidth: 1 }}
            contentContainerStyle={{
              gap: 10,
              paddingVertical: 10,
            }}
            renderItem={({ item, index }) => (
              <View>
                <Image
                  source={{
                    uri: item?.uri,
                  }}
                  style={{ width: 200, height: undefined, aspectRatio: 1 }}
                />
                <TouchableOpacity
                  onPress={() => onDeleteImagePress(item, index)}
                  style={{
                    height: 25,
                    width: 25,
                    borderRadius: 9999,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    right: 0,
                    backgroundColor: Colors.primary,
                  }}>
                  <Icon size={20} color='white' source={'delete-outline'} />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}

      <Text
        style={{
          fontSize: FontSizes.sm,
          color: Colors.gray500,
          textAlign: 'center',
        }}>
        Để thêm tệp đính kèm ảnh, hãy nhấn vào biểu tượng máy ảnh hoặc thư viện
        ảnh.
      </Text>
    </>
  );
});

const TextArea = () => {
  return (
    <>
      <View
        style={[
          {
            gap: 15,
            borderRadius: 10,
            padding: 10,
            paddingVertical: 15,
            backgroundColor: Colors.white,
          },
          appStyles.shadowStyle,
        ]}>
        <View>
          <Text style={styles.titleText}>Loại ghi chú</Text>
          <CustomTextInput
            containerStyle={{
              paddingVertical: 1,
              width: '100%',
              marginTop: 5,
              borderRadius: 8,
            }}
            editable={false}
            value='Ghi chú an toàn'
            onTextChange={() => {}}
          />
        </View>

        <View>
          <Text style={styles.titleText}>Ghi chú</Text>
          <CustomTextInput
            containerStyle={{
              paddingVertical: 1,
              width: '100%',
              marginTop: 5,
              borderRadius: 8,
            }}
            multiline
            value=''
            onTextChange={() => {}}
          />
        </View>
      </View>

      <View
        style={[
          {
            gap: 15,
            borderRadius: 10,
            padding: 10,
            paddingVertical: 15,
            backgroundColor: Colors.white,
          },
          appStyles.shadowStyle,
        ]}>
        <View>
          <Text style={styles.titleText}>Tiêu đề</Text>
          <CustomTextInput
            containerStyle={{
              paddingVertical: 1,
              width: '100%',
              marginTop: 5,
              borderRadius: 8,
            }}
            value=''
            onTextChange={() => {}}
          />
        </View>

        <View>
          <Text style={styles.titleText}>Họ và tên</Text>
          <CustomTextInput
            containerStyle={{
              paddingVertical: 1,
              width: '100%',
              marginTop: 5,
              borderRadius: 8,
            }}
            multiline
            value=''
            onTextChange={() => {}}
          />
        </View>

        <View>
          <Text style={styles.titleText}>Số điện thoại</Text>
          <CustomTextInput
            containerStyle={{
              paddingVertical: 1,
              width: '100%',
              marginTop: 5,
              borderRadius: 8,
            }}
            multiline
            value=''
            onTextChange={() => {}}
          />
        </View>

        <View>
          <Text style={styles.titleText}>Địa chỉ</Text>
          <CustomTextInput
            containerStyle={{
              paddingVertical: 1,
              width: '100%',
              marginTop: 5,
              borderRadius: 8,
            }}
            multiline
            value=''
            onTextChange={() => {}}
          />
        </View>

        <View>
          <Text style={styles.titleText}>Tỉnh / Thành phố</Text>
          <CustomTextInput
            containerStyle={{
              paddingVertical: 1,
              width: '100%',
              marginTop: 5,
              borderRadius: 8,
            }}
            multiline
            value=''
            onTextChange={() => {}}
          />
        </View>

        <View>
          <Text style={styles.titleText}>Quốc gia</Text>
          <CustomTextInput
            containerStyle={{
              paddingVertical: 1,
              width: '100%',
              marginTop: 5,
              borderRadius: 8,
            }}
            multiline
            value=''
            onTextChange={() => {}}
          />
        </View>
      </View>

      <View
        style={[
          {
            gap: 15,
            borderRadius: 10,
            padding: 10,
            paddingVertical: 15,
          },
          appStyles.shadowStyle,
        ]}>
        <View>
          <Text style={styles.titleText}>Tùy chọn</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 10,
              gap: 10,
            }}>
            <View style={{ flex: 1, gap: 5 }}>
              <Text>Nhắc lại master password</Text>
              <Text
                style={{
                  fontSize: FontSizes.sm,
                  color: Colors.gray500,
                }}>
                Yêu cầu mật khẩu chính của bạn khi bạn điền, sao chép hoặc chỉnh
                sửa tên người dùng và/hoặc mật khẩu của mình.
              </Text>
            </View>
            <View style={{ alignSelf: 'center' }}>
              <Switch />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  typeButton: {
    flex: 1,
    backgroundColor: Colors.gray200,
    padding: 8,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    color: Colors.gray500,
    fontSize: FontSizes.sm,
  },
});
