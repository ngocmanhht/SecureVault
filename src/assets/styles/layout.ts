import { TextStyle, ViewStyle } from 'react-native';

import { Colors } from './colors';

export const Padding = {
  screen: 16,
};

export const shadowStyle: ViewStyle = {
  shadowColor: Colors.gray900,
  shadowOffset: {
    width: 3,
    height: 5,
  },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 5,
  backgroundColor: Colors.white,
  borderWidth: 1,
  borderColor: Colors.gray200,
  marginBottom: 10, // to make shadow visible,
};

export const underlinedText: TextStyle = {
  paddingVertical: 2,
  textDecorationLine: 'underline',
};
