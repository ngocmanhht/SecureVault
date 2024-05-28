import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const sizeWidth = (value: number) => {
  return wp(value);
};

export const sizeHeight = (value: number) => {
  return hp(value);
};

export const fontSize = (value: number) => {
  return wp(value);
};
