import { observer } from 'mobx-react';
import React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
import UIStore from '../../stores/ui';
import useStores from '../../hooks/use-stores';

const LoadingIndicator = observer(() => {
  const uiStore: UIStore = useStores().uiStore;

  return (
    <Modal animationType='fade' transparent visible={uiStore.isLoading}>
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size='large' color={'#079DDA'} />
      </View>
    </Modal>
  );
});

export default LoadingIndicator;
