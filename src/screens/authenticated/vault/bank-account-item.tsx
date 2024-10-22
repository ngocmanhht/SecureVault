import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { IBankAccount } from '../../../type/bank-account';
import { Icon, Divider } from 'react-native-paper';
import { Colors, FontSizes } from '../../../assets/styles';

const BankAccountItem = ({
  item,
  onItemPress,
}: {
  item: IBankAccount;
  onItemPress: () => void;
}) => {
  return (
    <>
      <TouchableOpacity
        onPress={onItemPress}
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          padding: 10,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            gap: 10,
            alignItems: 'center',
          }}>
          <Icon color={Colors.yellow800} size={30} source={'credit-card'} />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: Colors.gray500,
              }}>
              {item?.title ?? ''}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Divider bold />
    </>
  );
};

export default BankAccountItem;

const styles = StyleSheet.create({});
