import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import {
  DefaultBorderRadius,
  DefaultPadding,
  FontSizes,
} from '../../assets/styles/typography';
import { Text } from '../text';

export const LongButton = ({
  title,
  buttonColor,
  textColor,
  onPress,
  buttonStyle,
  disable = false,
}: {
  title: string;
  buttonColor?: string;
  textColor?: string;
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  disable?: boolean;
}) => {
  return (
    <TouchableOpacity
      disabled={disable}
      onPress={onPress}
      style={[
        {
          alignSelf: 'center',
          backgroundColor: buttonColor || 'white',
          width: '90%',
          padding: DefaultPadding,
          borderRadius: DefaultBorderRadius,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: buttonColor ? undefined : 1,
          borderColor: '#D9D9D9',
        },
        buttonStyle,
      ]}>
      <Text
        style={{
          color: textColor || 'black',
          fontSize: FontSizes.lg,
          fontWeight: 'bold',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
