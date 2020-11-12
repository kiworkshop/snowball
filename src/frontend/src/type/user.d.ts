import { Note } from './note';

export namespace User {
  type IsLoggedIn = boolean;
  type Notes = Array<Note.Note>;

  interface Profile {
    id: string;
    email: string;
    name: string;
    age: number | null;
    gender: string;
    pictureUrl: string;
  }

  interface Info extends Profile {
    notes: Note.Notes;
  }
}
