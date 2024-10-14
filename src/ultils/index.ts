export const REACT_APP_SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || '';
export const REACT_APP_SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY || '';
export const AUTH_STORAGE_KEY = 'authProfile';

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
