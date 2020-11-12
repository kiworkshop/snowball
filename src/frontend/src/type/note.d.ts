import { UserType } from './user';

export namespace NoteType {
  interface Note {
    id: string;
    text: string;
    investmentDate: string;
    createdDate: string;
    lastModifiedDate: string;
  }

  interface NoteForm {
    text: string;
    investmentDate: string;
    user: UserType.UserInfo;
  }

  interface NoteState {
    noteInfo: Note;
    noteForm: NoteForm;
    loading: boolean;
    error: string;
  }
}
