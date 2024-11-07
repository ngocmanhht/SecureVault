import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import { Divider, Icon } from 'react-native-paper';
import { Colors, FontSizes } from '../../../assets/styles';
import { IPassword } from '../../../type/password';
import { INote, Note, NoteType } from '../../../type/note';
import PasswordItem from './password-item';
import BankAccountItem from './bank-account-item';
import { IBankAccount } from '../../../type/bank-account';
import ContactItem from './contact-item';
import NoteItem from './note-item';

export const Item = ({
  onItemPress,
  item,
}: {
  item: Note;
  onItemPress: () => void;
}) => {
  const content = useMemo(() => {
    switch (item.noteType) {
      case NoteType.Password:
        return (
          <PasswordItem
            item={item as IPassword}
            onItemPress={() => onItemPress()}
          />
        );
      case NoteType.BankAccount:
        return (
          <BankAccountItem
            item={item as IBankAccount}
            onItemPress={() => onItemPress()}
          />
        );
      case NoteType.Contact:
        return <ContactItem item={item as any} onItemPress={() => {}} />;
      case NoteType.Note:
        return (
          <NoteItem item={item as INote} onItemPress={() => onItemPress()} />
        );

      default:
        return <></>;
    }
  }, [item]);

  return <>{content}</>;
};

const styles = StyleSheet.create({});
