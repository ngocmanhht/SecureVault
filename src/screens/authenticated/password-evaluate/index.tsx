import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import { appStyles, Colors, FontSizes, Padding } from '../../../assets/styles';
import { useQuery } from '@tanstack/react-query';
import { supabaseService } from '../../../supabase';
import { TableName } from '../../../type/table';
import { Note, NoteType } from '../../../type/note';
import { Password } from '../../../type/password';
import { PasswordUtils } from '../../../ultils/password';
import { Text } from '../../../components/text';

const PasswordEvaluate = () => {
  const { data: passwords } = useQuery<Note[]>({
    queryKey: ['getPassword'],
    queryFn: () =>
      supabaseService.getAllData(TableName.Notes, NoteType.Password),
  });

  const summary = useMemo(() => {
    if (!!passwords) {
      const total = passwords.length;
      const passwordUtils = new PasswordUtils({
        isUseLowerCase: true,
      });
      let averagePasswordStrength = 0;
      let totalPasswordStrength = 0;

      let averagePasswordLength = 0;
      let totalPasswordLength = 0;

      let numberOfDuplicate = 0;
      let numberOfWeakPassword = 0;

      passwords.forEach((password: Note) => {
        if (password.password) {
          totalPasswordLength = totalPasswordLength + password.password.length;
          const score = passwordUtils.evaluateScorePassword(password.password);
          if (score <= 6) {
            numberOfWeakPassword = numberOfWeakPassword + 1;
          }
          console.log('score', score);
          totalPasswordStrength = totalPasswordStrength + score;
        }
      });
      const strings = passwords.map(password => password.password);
      const duplicates = strings.filter(
        (item, index) => strings.indexOf(item) !== index,
      );
      averagePasswordLength = Number((totalPasswordLength / total).toFixed(2));
      averagePasswordStrength = Number(
        (totalPasswordStrength / total).toFixed(2),
      );
      numberOfDuplicate = duplicates.length;

      return {
        total: {
          value: total,
          title: 'Tổng số mật khẩu đã quét',
        },
        averagePasswordLength: {
          value: averagePasswordLength,
          title: 'Độ dài trung bình',
        },
        averagePasswordStrength: {
          value: averagePasswordStrength,
          title: 'Điểm trung bình',
        },
        numberOfDuplicate: {
          value: numberOfDuplicate,
          title: 'Số lượng mật khẩu trùng lặp',
        },
        numberOfWeakPassword: {
          value: numberOfWeakPassword,
          title: 'Số lượng mật khẩu yếu',
        },
      };
    }
    return null;
  }, [passwords]);
  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.white,
        flex: 1,
      }}>
      <ScrollView style={{ flex: 1, padding: Padding.screen }}>
        <Text
          style={{
            fontSize: FontSizes.header,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Cảm ơn vì đã tham gia đánh giá mật khẩu
        </Text>
        {!!summary && (
          <View
            style={[
              {
                marginTop: 20,
                padding: 12,
              },
              appStyles.shadowStyle,
            ]}>
            {Object.entries(summary).map(([key, value]) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderColor: Colors.gray400,
                    alignContent: 'center',
                  }}>
                  <Text>{value.title}</Text>
                  <Text>{value.value}</Text>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PasswordEvaluate;

const styles = StyleSheet.create({});
