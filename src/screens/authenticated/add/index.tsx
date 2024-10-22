import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Note, NoteType } from '../../../type/note';
import { AddPassword } from './add-password';
import { AddBankAccount } from './add-bank-account';
import { AddNote } from './add-note';
import { Colors, Padding } from '../../../assets/styles';
import { AddContact } from './add-contact';
import { IPassword } from '../../../type/password';
export const AddScreen = () => {
  const navigtion = useNavigation();

  const route = useRoute();
  const params = route.params as { type: NoteType; item?: Note };

  const headerTitle = useMemo(() => {
    switch (params.type) {
      case NoteType.Password:
        if (!!params.item) {
          return 'Mật khẩu';
        }
        return 'Thêm mật khẩu';
      case NoteType.BankAccount:
        if (!!params.item) {
          return 'Tài khoản ngân hàng';
        }
        return 'Thêm tài khoản ngân hàng';
      case NoteType.Contact:
        if (!!params.item) {
          return 'Liên hệ';
        }
        return 'Thêm liên hệ';
      case NoteType.Note:
        if (!!params.item) {
          return 'Ghi chú';
        }
        return 'Thêm ghi chú';
      default:
        return 'Undefined';
    }
  }, [params.type]);

  useEffect(() => {
    navigtion.setOptions({
      headerTitle: headerTitle,
    });
  }, []);
  const fieldView = useMemo(() => {
    switch (params.type) {
      case NoteType.Password:
        return <AddPassword initialValue={params.item as any} />;
      case NoteType.BankAccount:
        return <AddBankAccount initialValue={params.item as any} />;
      case NoteType.Contact:
        return <AddContact />;
      case NoteType.Note:
        return <AddNote initialValue={params.item as any} />;
      default:
        return <></>;
    }
  }, [params.type]);

  return (
    <ScrollView
      contentContainerStyle={{ padding: Padding.screen }}
      style={{ backgroundColor: Colors.white, flex: 1 }}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        {fieldView}
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
