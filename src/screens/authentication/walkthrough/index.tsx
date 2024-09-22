import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from '../../../components/text';
import Swiper from 'react-native-swiper';
import { images } from '../../../assets/images';
import { Colors } from '../../../assets/styles';
import {
  DefaultBorderRadius,
  DefaultPadding,
} from '../../../assets/styles/typography';
import { LongButton } from '../../../components/long-button';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../const';
import { useEffect } from 'react';
import { asyncStorageService } from '../../../service/async-storage';

export const Walkthrough = () => {
  const navigation = useNavigation();
  const handleCountOpen = async () => {
    const number = await asyncStorageService.getCountNumberOpenApp();
    console.log('numberOpen', number);
    if (!!number && Number(number) === 1) {
      navigation.navigate(Screens.Login as never);
    } else {
      await asyncStorageService.setCountNumberOpenApp();
    }
  };

  useEffect(() => {
    handleCountOpen();
  }, []);

  return (
    <Swiper activeDotColor='red' showsButtons={false}>
      <ImageBackground source={images.Walkthrough1} style={styles.slide} />
      <ImageBackground source={images.Walkthrough2} style={styles.slide} />
      <ImageBackground source={images.Walkthrough3} style={styles.slide}>
        <View
          style={{
            width: '100%',
            gap: 10,
            alignSelf: 'flex-end',
            position: 'absolute',
            bottom: 100,
          }}>
          <LongButton
            textColor='white'
            title='Đăng nhập'
            buttonColor={Colors.red}
            onPress={() => {
              navigation.navigate(Screens.Login as never);
            }}
          />
          <LongButton onPress={() => {}} title='Đăng ký' />
        </View>
      </ImageBackground>
    </Swiper>
  );
};
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
