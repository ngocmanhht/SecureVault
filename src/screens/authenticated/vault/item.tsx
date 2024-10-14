import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Divider, Icon } from 'react-native-paper';
import { Colors, FontSizes } from '../../../assets/styles';
import { IPassword } from '../../../type/password';

export const Item = ({
  onItemPress,
  item,
}: {
  item: IPassword;
  onItemPress: () => void;
}) => {
  console.log('item', item);
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
          <Icon source={'facebook'} size={30} color={Colors.primary} />
          <View style={{ flex: 1 }}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: FontSizes.md,
                fontWeight: 'bold',
              }}>
              {'Generated Password on Mobile'}
            </Text>
            <Text
              style={{
                color: Colors.gray500,
              }}>
              {item?.user_name ?? ''}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <Icon size={25} source={'content-copy'} color={Colors.primary} />
        </TouchableOpacity>
      </TouchableOpacity>
      <Divider bold />
    </>
  );
};

const styles = StyleSheet.create({});
