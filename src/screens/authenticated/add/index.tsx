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
import { NoteType } from '../../../type/note';
import { AddPassword } from './add-password';
import { AddBankAccount } from './add-bank-account';
import { AddNote } from './add-note';
import { Colors, Padding } from '../../../assets/styles';
import { AddContact } from './add-contact';
export const AddScreen = () => {
  const navigtion = useNavigation();

  const route = useRoute();
  const params = route.params as { type: NoteType };

  const headerTitle = useMemo(() => {
    switch (params.type) {
      case NoteType.Password:
        return 'Thêm mật khẩu';
      case NoteType.BankAccount:
        return 'Thêm tài khoản ngân hàng';
      case NoteType.Contact:
        return 'Thêm liên hệ';
      case NoteType.Note:
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
        return <AddPassword />;
      case NoteType.BankAccount:
        return <AddBankAccount />;
      case NoteType.Contact:
        return <AddContact />;
      case NoteType.Note:
        return <AddNote />;
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
