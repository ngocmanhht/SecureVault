import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_STORAGE_KEY, MASTER_PASSWORD_KEY } from '../ultils';
import { Password } from '../type/password';

class AsyncStorageService {
  getCountNumberOpenApp = async () => {
    const value = await AsyncStorage.getItem('numberOpen');
    if (value !== null) {
      return value;
    }
    return null;
  };
  setCountNumberOpenApp = async () => {
    const value = await AsyncStorage.getItem('numberOpen');
    if (value === null) {
      AsyncStorage.setItem('numberOpen', '1');
    }
  };
  getProfile = async () => {
    const value = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  };
  removeProfile = async () => {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
  };
  setIsUseFaceID = async (value: boolean) => {
    await AsyncStorage.setItem('isUseFaceID', JSON.stringify(value));
  };
  getIsUseFaceID = async () => {
    const value = await AsyncStorage.getItem('isUseFaceID');
    if (value !== null) {
      return !!JSON.parse(value);
    }
    return false;
  };

  getMasterPasswordFromLocal = async () => {
    const value = await AsyncStorage.getItem(MASTER_PASSWORD_KEY);
    return !!value ? JSON.parse(value) : null;
  };
  getGeneratedPasswordHistory = async () => {
    const value = await AsyncStorage.getItem(MASTER_PASSWORD_KEY);
    if (value !== null) {
      return JSON.parse(value) as Array<Password>;
    }
    return [] as Array<Password>;
  };
  setMasterPasswordHistory = async (passwords: any) => {
    const parsedPasswords = JSON.stringify(passwords);
    await AsyncStorage.setItem(MASTER_PASSWORD_KEY, parsedPasswords);
  };
  clearMasterPasswordHistory = async () => {
    await AsyncStorage.removeItem(MASTER_PASSWORD_KEY);
  };
}

export const asyncStorageService = new AsyncStorageService();
