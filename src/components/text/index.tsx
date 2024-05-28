import React from 'react';

import { StyleSheet, Text as RNText, TextProps } from 'react-native';
import { fontSize, FontSizes } from '../../assets/styles';

export const Text = (props: TextProps) => {
  const { fontWeight } = StyleSheet.flatten(props.style || {});
  return (
    <RNText
      style={[
        {
          fontFamily: fontWeight === 'bold' ? 'Inter-Bold' : 'Inter-Regular',
          fontSize: FontSizes.content,
        },
        props.style,
      ]}>
      {props.children}
    </RNText>
  );
};
