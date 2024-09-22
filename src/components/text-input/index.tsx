import {
  Image,
  ImageSourcePropType,
  NativeSyntheticEvent,
  StyleProp,
  TextInput,
  TextInputFocusEventData,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Icons } from '../../assets/icons/const';
import { useState } from 'react';
import { Colors, FontSizes } from '../../assets/styles';
import { Text } from '../text';
import { DefaultPadding } from '../../assets/styles/typography';
export const CustomTextInput = ({
  isPassword = false,
  placeholder,
  headerIcon,
  iconBackgroundColor,
  onTextChange,
  value,
  onBlur,
  containerStyle,
  multiline = false,
}: {
  multiline?: boolean;
  isPassword?: boolean;
  placeholder?: string;
  headerIcon?: ImageSourcePropType;
  iconBackgroundColor?: string;
  onTextChange: (text: string) => void;
  value?: string;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  containerStyle?: StyleProp<ViewStyle>;
}) => {
  const [hide, setHide] = useState(false);
  return (
    <View
      style={[
        {
          alignSelf: 'center',
          width: '90%',
          paddingVertical: 10,
          flexDirection: 'row',
          gap: 5,
          borderColor: '#D9D9D9',
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: 8,
        },
        containerStyle,
      ]}>
      {!!headerIcon && (
        <View
          style={{
            padding: 5,
            borderRadius: 5,
            backgroundColor: iconBackgroundColor,
          }}>
          <Image
            style={{ width: 30, height: 25, resizeMode: 'contain' }}
            source={headerIcon}
          />
        </View>
      )}

      <TextInput
        multiline={multiline}
        style={{
          flex: 1,
          paddingVertical: 5,
          fontSize: FontSizes.lg,
          marginLeft: 5,
        }}
        value={value}
        onChangeText={e => onTextChange(e)}
        placeholder={placeholder}
        secureTextEntry={isPassword ? !hide : false}
        onBlur={onBlur}
        autoCapitalize='none'
      />
      {isPassword && (
        <TouchableOpacity
          onPress={() => setHide(!hide)}
          style={{ alignSelf: 'center' }}>
          <Image
            style={{
              width: 20,
              height: 20,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
            source={hide ? Icons.Hide : Icons.UnHide}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
