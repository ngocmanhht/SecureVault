import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Icon, Divider } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { FontSizes } from '../../../assets/styles';

const ContactItem = ({
  item,
  onItemPress,
}: {
  item: any;
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
          <Icon color={Colors.gray500} size={30} source={'note'} />
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
              {item?.userName ?? ''}
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

export default ContactItem;

const styles = StyleSheet.create({});
