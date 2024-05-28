import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Text as RNText,
} from 'react-native';
import React from 'react';
import { Text } from '../../../components/text';

const Vault = () => {
  return (
    <SafeAreaView>
      <Text>Vault</Text>
      <RNText
        style={{
          fontWeight: 'bold',
        }}>
        RNText
      </RNText>

      <FlatList
        data={[1, 2, 3, 4, 5]}
        renderItem={({ item }) => <Text>{item}</Text>}
        ListEmptyComponent={<Text>Empty</Text>}
      />
    </SafeAreaView>
  );
};

export default Vault;

const styles = StyleSheet.create({});
