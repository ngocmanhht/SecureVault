export enum PasswordStrength {
  Average,
  Strong,
}
export type PasswordGenerateOptions = {
  isUseNumber?: boolean;
  isUseLowerCase?: boolean;
  isUseUpperCase?: boolean;
};
