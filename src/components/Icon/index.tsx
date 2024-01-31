import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';

export const Icon = ({ source }: { source: ImageSourcePropType }) => {
  return (
    <Image
      source={source}
      style={{ width: 25, height: 25 }}
      resizeMode={'cover'}
    />
  );
};
