import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { Colors } from '../../../assets/styles';
import { StepOne } from './StepOne';
import StepTwo from './StepTwo';

export const RegisterSuccess = () => {
  const [step, setStep] = useState(1);
  useEffect(() => {
    setTimeout(() => {
      setStep(2);
    }, 2000);
  }, []);

  const content = useMemo(() => {
    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <></>;
      default:
        return <></>;
    }
  }, [step]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      {content}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
