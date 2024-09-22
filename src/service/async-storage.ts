import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_STORAGE_KEY } from '../ultils';

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
}

export const asyncStorageService = new AsyncStorageService();
