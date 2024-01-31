import { action, makeObservable, observable } from 'mobx';

class UIStore {
  constructor() {
    makeObservable(this);
  }

  @observable isLoading: boolean = false;

  @action showLoading() {
    this.isLoading = true;
  }

  @action hideLoading() {
    this.isLoading = false;
  }
}

export default UIStore;
