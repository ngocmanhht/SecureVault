import { action, makeObservable, observable } from 'mobx';
import { UserProfile } from '../type/user';
import { Session, User } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SessionStore {
  constructor() {
    makeObservable(this);
    this.getDefaultsSetting();
  }

  @observable isLogin: boolean = false;
  @observable userProfile?: User & Session;
  @observable settings: {
    autoLogoutTime: number;
    autoClearClipBoard: number;
    lockOption: number;
    skipPrompt: number;
  } = {
    autoClearClipBoard: 300000,
    autoLogoutTime: 0,
    lockOption: 0,
    skipPrompt: 0,
  };

  @action getDefaultsSetting = async () => {
    const data = await AsyncStorage.getItem('settings');
    if (!!data && data !== null) {
      const parsedData = JSON.parse(data);
      console.log('parsedData', parsedData);
      if (!!parsedData) {
        this.settings = {
          ...parsedData,
        };
      } else {
        const settings = this.settings;
        console.log('eee', settings);
        const stringifyData = JSON.stringify(settings);
        await AsyncStorage.setItem('settings', stringifyData);
      }
    } else {
      const settings = this.settings;
      console.log('eee', settings);
      const stringifyData = JSON.stringify(settings);
      await AsyncStorage.setItem('settings', stringifyData);
    }
  };

  @action setUserProfile(userProfile: any) {
    this.userProfile = userProfile;
  }

  @action changeAutoLogoutTime = async (time: number) => {
    this.settings = {
      ...this.settings,
      autoLogoutTime: time,
    };
    const settings = this.settings;
    const stringifyData = JSON.stringify(settings);
    await AsyncStorage.setItem('settings', stringifyData);
  };
  @action changeAutoClearClipBoard = async (time: number) => {
    this.settings = {
      ...this.settings,
      autoClearClipBoard: time,
    };
    const settings = this.settings;
    const stringifyData = JSON.stringify(settings);
    await AsyncStorage.setItem('settings', stringifyData);
  };
  @action changeLockOption = async (time: number) => {
    this.settings = {
      ...this.settings,
      lockOption: time,
    };
    const settings = this.settings;
    const stringifyData = JSON.stringify(settings);
    await AsyncStorage.setItem('settings', stringifyData);
  };
  @action changeSkipPrompt = async (time: number) => {
    this.settings = {
      ...this.settings,
      skipPrompt: time,
    };
    const settings = this.settings;
    const stringifyData = JSON.stringify(settings);
    await AsyncStorage.setItem('settings', stringifyData);
  };
  @action clearUserProfile() {
    this.userProfile = undefined;
  }
}

export default SessionStore;
