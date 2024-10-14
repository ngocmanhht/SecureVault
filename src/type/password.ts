export enum PasswordStrength {
  Average,
  Strong,
}
export type PasswordGenerateOptions = {
  isUseNumber?: boolean;
  isUseLowerCase?: boolean;
  isUseUpperCase?: boolean;
};

export interface IPassword {
  id?: number;
  type_account: string;
  url: string;
  user_name: string;
  password: string;
  user_id: any;
}
