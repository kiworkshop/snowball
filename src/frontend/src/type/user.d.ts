import { NoteType } from './note';

export namespace UserType {
  interface UserInfo {
    id: string;
    email: string;
    name: string;
    age: number | null;
    gender: string;
    pictureUrl: string;
    notes: Array<NoteType.Note>;
  }

  interface UserState {
    userInfo: UserInfo;
    logged: boolean;
    loading: boolean;
    error: string;
  }
}
