import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
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
import {
  Control,
  Controller,
  useForm,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { IBankAccount } from '../../../type/bank-account';
import { NoteType } from '../../../type/note';
import DatePicker from 'react-native-date-picker';

import moment from 'moment';
import { useMutation } from '@tanstack/react-query';
import { supabaseService } from '../../../supabase';
export const AddBankAccount = ({
  initialValue,
}: {
  initialValue?: IBankAccount;
}) => {
  const [tabIndex, setTabIndex] = useState(1);
  const navigation = useNavigation();

  const {
    formState: { isDirty },
    control,
    watch,
    setValue,
    getValues,
    handleSubmit,
  } = useForm<IBankAccount>({
    defaultValues: {
      noteType: NoteType.BankAccount,
      isRequireMasterPassword: false,
      type: 'Secure Note',
    },
  });
  const toast = useCustomToast();
  const addNoteMutation = useMutation({
    mutationFn: (data: IBankAccount) => supabaseService.createNewNote(data),
    onSuccess: () => {
      toast.show({
        type: 'success',
        title: 'Tạo thành công',
        content: '',
      });
      navigation.navigate(Screens.Vault as never);
    },
  });
  const onSubmit = async (data: IBankAccount) => {
    const uid = await supabaseService.getUid();
    const body: IBankAccount = {
      ...data,
      userid: uid,
    };
    addNoteMutation.mutate(body);
  };

  useEffect(() => {
    if (!!initialValue) {
      for (const [key, value] of Object.entries(initialValue)) {
        setValue(key as any, value, {
          shouldDirty: false,
        });
      }
    }
  }, [initialValue]);
  return (
    <View style={{ flex: 1, gap: 20 }}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 8,
            borderColor: Colors.yellow300,
            backgroundColor: Colors.yellow100,
          }}>
          <Icon color={Colors.yellow800} size={35} source={'credit-card'} />
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Controller
            control={control}
            name='title'
            render={({ field: { value, onChange } }) => (
              <CustomTextInput
                containerStyle={{
                  width: '100%',
                  backgroundColor: '#EEF2FB',
                  paddingVertical: 10,
                }}
                value={value}
                onTextChange={text => {
                  onChange(text);
                }}
              />
            )}
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
      {tabIndex === 1 && <TextArea control={control} />}
      {tabIndex === 2 && <ImageArea watch={watch} setValue={setValue} />}

      <View style={{ paddingVertical: 10, zIndex: 999999999 }}>
        <LongButton
          textColor={Colors.white}
          title='Lưu'
          disable={!isDirty}
          buttonColor={isDirty ? Colors.primary : Colors.gray600}
          onPress={handleSubmit(onSubmit)}
          buttonStyle={{
            width: '100%',
          }}
        />
      </View>
    </View>
  );
};

const ImageArea = React.memo(
  ({
    watch,
    setValue,
  }: {
    watch: UseFormWatch<IBankAccount>;
    setValue: UseFormSetValue<IBankAccount>;
  }) => {
    const values = watch('images');

    const [images, setImages] = useState<Array<{ id: number; uri: string }>>(
      [],
    );
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

    useEffect(() => {
      if (!!values) {
        setImages(JSON.parse(values));
      }
    }, [values]);

    useEffect(() => {
      if (images.length > 0) {
        setValue('images', JSON.stringify(images) as any);
      }
    }, [images]);

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
          Để thêm tệp đính kèm ảnh, hãy nhấn vào biểu tượng máy ảnh hoặc thư
          viện ảnh.
        </Text>
      </>
    );
  },
);

const TextArea = ({ control }: { control: Control<IBankAccount, any> }) => {
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

          <Controller
            control={control}
            name='content'
            render={({ field: { value, onChange } }) => (
              <CustomTextInput
                containerStyle={{
                  paddingVertical: 1,
                  width: '100%',
                  marginTop: 5,
                  borderRadius: 8,
                }}
                multiline
                value={value}
                onTextChange={text => {
                  onChange(text);
                }}
              />
            )}
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
          <Text style={styles.titleText}>Tên trên thẻ</Text>
          <Controller
            control={control}
            name='cardName'
            render={({ field: { value, onChange } }) => (
              <CustomTextInput
                containerStyle={{
                  paddingVertical: 1,
                  width: '100%',
                  marginTop: 5,
                  borderRadius: 8,
                }}
                multiline
                value={value}
                onTextChange={text => {
                  onChange(text);
                }}
              />
            )}
          />
        </View>

        <View>
          <Text style={styles.titleText}>Loại</Text>
          <Controller
            control={control}
            name='typeCard'
            render={({ field: { value, onChange } }) => (
              <CustomTextInput
                containerStyle={{
                  paddingVertical: 1,
                  width: '100%',
                  marginTop: 5,
                  borderRadius: 8,
                }}
                value={value}
                onTextChange={text => {
                  onChange(text);
                }}
              />
            )}
          />
        </View>

        <View>
          <Text style={styles.titleText}>Số</Text>
          <Controller
            control={control}
            name='cardNumber'
            render={({ field: { value, onChange } }) => (
              <CustomTextInput
                containerStyle={{
                  paddingVertical: 1,
                  width: '100%',
                  marginTop: 5,
                  borderRadius: 8,
                }}
                isPassword
                value={value}
                onTextChange={text => {
                  onChange(text);
                }}
              />
            )}
          />
        </View>

        <View>
          <Text style={styles.titleText}>CVV</Text>
          <Controller
            control={control}
            name='cvv'
            render={({ field: { value, onChange } }) => (
              <CustomTextInput
                containerStyle={{
                  paddingVertical: 1,
                  width: '100%',
                  marginTop: 5,
                  borderRadius: 8,
                }}
                isPassword
                value={value}
                onTextChange={text => {
                  onChange(text);
                }}
              />
            )}
          />
        </View>

        <View>
          <Text style={styles.titleText}>Ngày bắt đầu</Text>
          <Controller
            control={control}
            name='startDay'
            render={({ field: { value, onChange } }) => (
              <DatePicker
                date={
                  !!value ? moment(value, 'DD/MM/YYYY').toDate() : new Date()
                }
                maximumDate={new Date()}
                mode='date'
                onDateChange={date => {
                  const formatedDate = moment(date).format('DD/MM/YYYY');
                  onChange(formatedDate);
                }}
              />
            )}
          />
        </View>

        <View>
          <Text style={styles.titleText}>Ngày hết hạn</Text>
          <Controller
            control={control}
            name='expiredDay'
            render={({ field: { value, onChange } }) => (
              <DatePicker
                date={
                  !!value ? moment(value, 'DD/MM/YYYY').toDate() : new Date()
                }
                mode='date'
                onDateChange={date => {
                  const formatedDate = moment(date).format('DD/MM/YYYY');
                  onChange(formatedDate);
                }}
              />
            )}
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
              <Controller
                control={control}
                name='isRequireMasterPassword'
                render={({ field: { value, onChange } }) => (
                  <Switch
                    value={!!value}
                    onValueChange={val => onChange(val)}
                  />
                )}
              />
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
