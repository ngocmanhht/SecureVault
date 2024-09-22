import SessionStore from './session';
import UIStore from './ui';

const stores = {
  uiStore: new UIStore(),
  sessionStore: new SessionStore(),
};

export default stores;
