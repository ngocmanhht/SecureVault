import { NoteType } from './note';

export interface IBankAccount {
  noteType?: NoteType;
  title: string;
  type: string;
  content: string;
  isRequireMasterPassword?: boolean;
  cardName: string;
  typeCard: string;
  cardNumber: string;
  cvv: string;
  startDay: string;
  expiredDay: string;
  images?: string;
  userid?: any;
}
