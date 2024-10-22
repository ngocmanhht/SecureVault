import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { INote } from '../../../type/note';
import { Icon, Divider } from 'react-native-paper';
import { Colors, FontSizes } from '../../../assets/styles';

const NoteItem = ({
  item,
  onItemPress,
}: {
  item: INote;
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

export default NoteItem;

const styles = StyleSheet.create({});
