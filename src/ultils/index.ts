import Aes from 'react-native-aes-crypto';

export const REACT_APP_SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || '';
export const REACT_APP_SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY || '';
export const REACT_APP_KEY =
  process.env.REACT_APP_KEY ||
  '9c01afdcdc42261cad46c5b5b56c56d55f095161258e869fb9f337873a72f7ad';
export const REACT_APP_SALT = process.env.REACT_APP_SALT || 'Admin123@';

export const AUTH_STORAGE_KEY = 'authProfile';
export const FACE_ID_STORAGE_KEY = 'faceid';
export const MASTER_PASSWORD_KEY = 'masterPassword';
export const PASSWORD_HISTORY_KEY = 'passwordhistory';

export const validateEmail = (email: any) => {
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  return emailRegex.test(email);
};

export const validateViPhoneNumber = (phoneNumber: any) => {
  const phoneNumberRegex = /^(0[1-9][0-9]{8}|84[1-9][0-9]{8})$/;

  return phoneNumberRegex.test(phoneNumber);
};
export const validatePassword = (password: any) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{12,}$/;
  return passwordRegex.test(password);
};

export const generateKey = (password: string, salt: string) =>
  Aes.pbkdf2(password, salt, 5000, 256, 'sha256');
