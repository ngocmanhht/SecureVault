import { action, makeObservable, observable } from 'mobx';
import { UserProfile } from '../type/user';
import { Session, User } from '@supabase/supabase-js';

class SessionStore {
  constructor() {
    makeObservable(this);
  }

  @observable isLogin: boolean = false;
  @observable userProfile?: User & Session;

  @action setUserProfile(userProfile: any) {
    console.log('progile', userProfile);
    this.userProfile = userProfile;
  }

  @action clearUserProfile() {
    this.userProfile = undefined;
  }
}

export default SessionStore;
