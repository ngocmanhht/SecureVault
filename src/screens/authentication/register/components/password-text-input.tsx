import { TextInput } from 'react-native-paper';
import { Colors } from '../../../../assets/styles/colors';
import { useState } from 'react';
import React from 'react';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
export const PasswordTextInput = ({
  value,
  onChangeText,
  label,
  onBlur,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}) => {
  const [passwordSecureTextEntry, setPasswordSecureTextEntry] = useState(true);

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      style={{
        backgroundColor: Colors.gray100,
        paddingVertical: 0,
        margin: 0,
      }}
      secureTextEntry={passwordSecureTextEntry}
      theme={{
        colors: {
          placeholder: Colors.gray500,
          primary: Colors.primary,
        },
      }}
      right={
        <TextInput.Icon
          onPress={() => {
            setPasswordSecureTextEntry(!passwordSecureTextEntry);
          }}
          icon={!passwordSecureTextEntry ? 'eye-off' : 'eye'}
        />
      }
      label={label}
    />
  );
};
