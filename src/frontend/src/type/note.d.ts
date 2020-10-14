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
  }
}
