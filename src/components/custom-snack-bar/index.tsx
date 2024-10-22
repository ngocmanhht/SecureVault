import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Snackbar } from 'react-native-paper';
import { observer } from 'mobx-react';
import UIStore from '../../stores/ui';
import useStores from '../../hooks/use-stores';
import stores from '../../stores';
import { Colors } from '../../assets/styles/colors';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const CustomSnackBar = observer(() => {
  const uiStore = stores.uiStore;
  const { isShowSnackBar, content } = uiStore.snackBar;
  return (
    <Snackbar
      style={{
        width: '60%',
        alignSelf: 'center',
      }}
      visible={isShowSnackBar}
      duration={1000}
      onDismiss={() => {
        uiStore.hideSnackBar();
      }}>
      <Text
        style={{
          color: Colors.white,
          textAlign: 'center',
        }}>
        Đã lưu vào clipboard
      </Text>
      <Text
        style={{
          color: Colors.white,
          textAlign: 'center',
        }}
        numberOfLines={3}>
        {content}
      </Text>
    </Snackbar>
  );
});

export default CustomSnackBar;

const styles = StyleSheet.create({});
