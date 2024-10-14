import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthError, createClient } from '@supabase/supabase-js';
import { TableName } from '../type/table';
import { useState, useEffect } from 'react';
import useCustomToast from './use-toast';
import SessionStore from '../stores/session';
import { supabase } from '../ultils/supabase';

export const useSupabase = (tableName: TableName) => {
  const [data, setData] = useState<Array<any> | null>();
  const [isLoading, setIsLoading] = useState(true);
  const toast = useCustomToast();

  const handleError = (error: AuthError) => {
    toast.show({
      type: 'error',
      content: error.code || 'Server Error',
    });
  };
  const getAllData = async () => {
    try {
      let { data, error } = await supabase.from(tableName).select('*');
      setData(data);
      // if(!!error)
      // {
      //   error.code===
      // }
    } finally {
      setIsLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      handleError(error);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      handleError(error);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);
  return { data, isLoading };
};
