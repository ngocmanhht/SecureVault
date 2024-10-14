import { View, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { FontSizes } from '../../../../assets/styles';

export const CheckBoxWithLabel = ({
  title,
  status,
}: {
  title: string;
  status: 'indeterminate' | 'checked' | 'unchecked';
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Checkbox
        theme={{
          colors: {
            primary: Colors.primary,
          },
        }}
        status={status}
        onPress={() => {
          // setChecked(!checked);
        }}
      />
      <Text
        style={{
          color: Colors.gray500,
          fontSize: FontSizes.sm,
        }}>
        {title}
      </Text>
    </View>
  );
};
