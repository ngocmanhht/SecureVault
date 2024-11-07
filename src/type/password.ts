import { NoteType } from './note';

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
  typeAccount: string;
  url: string;
  userName: string;
  password: string;
  userid?: any;
  notes?: string;
  isRequireMasterPassword?: boolean;
  noteType?: NoteType;
  isEncrypt?: boolean;
  iv?: string;
  createdAt: string;
}
export interface Password {
  value: string;
  createdAt: string;
  id: any;
}
