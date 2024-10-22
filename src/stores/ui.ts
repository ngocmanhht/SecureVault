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

  @observable snackBar: {
    isShowSnackBar: boolean;
    content?: string;
  } = {
    isShowSnackBar: false,
  };

  @action showSnackBar = ({ content }: { content: string }) => {
    this.snackBar = {
      isShowSnackBar: true,
      content: content,
    };
  };
  @action hideSnackBar = () => {
    this.snackBar = {
      isShowSnackBar: false,
    };
  };
}

export default UIStore;
