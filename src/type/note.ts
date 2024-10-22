export enum NoteType {
  Password = '0',
  Note = '1',
  Contact = '2',
  BankAccount = '3',
}

export interface INote {
  noteType?: NoteType;
  title: string;
  type: string;
  content: string;
  isRequireMasterPassword?: boolean;
  images?: string;
  userid?: any;
  id: number;
}

export interface Note {
  id: number;
  createdAt: string;
  noteType: string;
  typeAccount: string;
  userName: string;
  password: string;
  notes: string;
  isRequireMasterPassword: boolean;
  title: string;
  type: string;
  content: string;
  images?: string | null;
  cardName: string;
  typeCard: string;
  cardNumber: string;
  cvv: string;
  startDay: string;
  expiredDay: string;
  updateAt: string;
  userid: string;
  url: string;
}
