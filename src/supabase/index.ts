import Toast from 'react-native-toast-message';
import { Screens } from '../const';
import { navigationService } from '../service/navigation-service';
import { supabase } from './../ultils/supabase';
import {
  AuthError,
  PostgrestError,
  SupabaseClient,
} from '@supabase/supabase-js';
import { TableName } from '../type/table';
import { IPassword } from '../type/password';
import { error } from 'console';
import { INote, Note, NoteType } from '../type/note';
import { IBankAccount } from '../type/bank-account';

class SupabaseService {
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  private handleError = (error: AuthError | PostgrestError | null) => {
    // if (error?.code === "401") {
    //   navigationService.reset(Screens.Authentication);
    // }

    Toast.show({
      type: 'error',
      text1: error?.code || 'Server Error',
    });
  };

  signUpWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (!!error) {
      this.handleError(error);
      return Promise.reject(error);
    }
    return data;
  };

  signInWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (!!error) {
      this.handleError(error);
      return Promise.reject(error);
    }
    if (!!data) {
      return data;
    }
  };

  logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      this.handleError(error);
    }
  };

  getAllData = async (tableName: TableName, noteType?: NoteType | null) => {
    let query = supabase.from(tableName).select('*');
    query = query.order('id', {
      ascending: true,
    });
    if (noteType) {
      query = query.eq('noteType', noteType);
    }

    const { data, error } = await query;
    if (!!!data) {
      return [];
    }
    return data as Array<Note>;
  };

  createNewNote = async (note: IPassword | INote | IBankAccount) => {
    const { data, error } = await supabase
      .from(TableName.Notes)
      .insert(note)
      .select();
    if (!!error) {
      this.handleError(error);
      return Promise.reject(error);
    }
    if (!!data) {
      console.log('data', data);
      return Promise.resolve(data);
    }
  };

  updateNote = async (note: IPassword | INote | IBankAccount, id: any) => {
    const { data, error } = await supabase
      .from(TableName.Notes)
      .update({
        ...note,
        id: id,
      })
      .eq('id', id)
      .select();
    console.log('a1k5w', data);
    if (!!error) {
      this.handleError(error);
      return Promise.reject(error);
    }
    if (!!data) {
      console.log('data', data);
      return Promise.resolve(data);
    }
  };

  deleteNote = async (id: any) => {
    const { error } = await supabase
      .from(TableName.Notes)
      .delete()
      .eq('id', id);

    if (!!error) {
      this.handleError(error);
      return Promise.reject(error);
    }
    return Promise.resolve('success');
  };

  getUid = async () => {
    const user = await supabase.auth.getUser();
    if (!!user) {
      return user.data.user?.id;
    }
  };
}

export const supabaseService = new SupabaseService(supabase);
