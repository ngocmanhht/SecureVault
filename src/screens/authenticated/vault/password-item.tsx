import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { IPassword } from '../../../type/password';
import { Divider, Icon } from 'react-native-paper';
import { Colors } from '../../../assets/styles/colors';
import { FontSizes } from '../../../assets/styles/typography';
import { Note } from '../../../type/note';

export const getColors = (label: string) => {
  switch (label) {
    case 'Facebook':
      return Colors.blueA700;
    case 'Google':
      return Colors.primary;
    case 'Twitter':
      return Colors.primary;
    case 'Instagram':
      return Colors.orange600;
    case 'Linkedin':
      return Colors.primary;
    case 'Github':
      return 'black';
    case 'Gitlab':
      return Colors.orange500;
    case 'Jira':
      return Colors.primary;
    case 'Other':
      return Colors.cyan600;
    default:
      return Colors.gray500;
  }
};

export const data = [
  { label: 'Facebook', value: 'Facebook', icon: 'facebook' },
  { label: 'Google', value: 'Google', icon: 'google' },
  { label: 'Twitter', value: 'Twitter', icon: 'twitter' },
  { label: 'Instagram', value: 'Instagram', icon: 'instagram' },
  { label: 'Linkedin', value: 'Linkedin', icon: 'linkedin' },
  { label: 'Github', value: 'Github', icon: 'github' },
  { label: 'Gitlab', value: 'Gitlab', icon: 'gitlab' },
  { label: 'Jira', value: 'Jira', icon: 'jira' },
  { label: 'Other', value: 'Other', icon: 'note-text' },
];

export const getMatchedItem = (item: Note) => {
  return data?.find(i => i.value === item?.typeAccount) || data[7];
};

const PasswordItem = ({
  item,
  onItemPress,
}: {
  item: IPassword;
  onItemPress: () => void;
}) => {
  const matchedItem = data.find(i => i.value === item.typeAccount) || data[7];

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
          <Icon
            source={matchedItem.icon}
            size={30}
            color={getColors(matchedItem.label)}
          />
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

export default PasswordItem;

const styles = StyleSheet.create({});
