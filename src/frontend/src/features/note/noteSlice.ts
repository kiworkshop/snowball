import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import moment from 'moment';
import * as Type from '../../types';

interface NoteState {
  note: {
    [id: number]: Type.Note;
  };
  notes: {
    content: Array<Type.Note>;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
  loading: {
    [action: string]: boolean;
  };
  error: {
    [action: string]: Error | null;
  };
}

const initialState: NoteState = {
  note: {},
  notes: {
    content: [],
    totalPages: 0,
    currentPage: 1,
    pageSize: 10,
  },
  loading: {},
  error: {},
};

const parseNote = (note: Type.Note): Type.Note => {
  return {
    ...note,
    investmentDate: moment(note.investmentDate).format('YYYY-MM-DD'),
    createdDate: moment(note.createdDate).format('YYYY-MM-DD'),
    modifiedDate: moment(note.modifiedDate || note.createdDate).format('YYYY-MM-DD'),
  };
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    initializeNoteList: (state) => {
      state.notes.currentPage = 1;
      state.notes.pageSize = 10;
    },
    getNotesRequest: (state, action: PayloadAction<{ page: number; size: number }>) => {
      state.loading.getNotes = true;
      state.error.getNotes = null;
    },
    getNotesSuccess: (
      state,
      action: PayloadAction<{
        content: Array<Type.Note>;
        totalPages: number;
      }>
    ) => {
      state.notes = {
        ...state.notes,
        content: action.payload.content.map(parseNote),
        totalPages: action.payload.totalPages,
      };
      state.loading.getNotes = false;
      state.error.getNotes = null;
    },
    getNotesFailure: (state, action: PayloadAction<AxiosError>) => {
      state.loading.getNotes = false;
      state.error.getNotes = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.notes.currentPage = action.payload;
    },
    setSize: (state, action: PayloadAction<number>) => {
      state.notes.pageSize = action.payload;
    },
    getNoteRequest: (state, action: PayloadAction<number>) => {
      state.loading.getNote = true;
      state.error.getNote = null;
    },
    getNoteSuccess: (state, action: PayloadAction<Type.Note>) => {
      state.note[action.payload.id] = parseNote(action.payload);
      state.loading.getNote = false;
      state.error.getNote = null;
    },
    getNoteFailure: (state, action: PayloadAction<AxiosError>) => {
      state.loading.getNote = false;
      state.error.getNote = action.payload;
    },
    createNoteRequest: (state, action: PayloadAction<Type.NoteForm>) => {
      state.loading.createNote = true;
      state.error.createNote = null;
    },
    createNoteSuccess: (state, action: PayloadAction<number>) => {
      state.loading.createNote = false;
      state.error.createNote = null;
    },
    createNoteFailure: (state, action: PayloadAction<AxiosError>) => {
      state.loading.createNote = false;
      state.error.createNote = action.payload;
    },
    updateNoteRequest: (state, action: PayloadAction<{ id: number; form: Type.NoteForm }>) => {
      state.loading.updateNote = true;
      state.error.updateNote = null;
    },
    updateNoteSuccess: (state, action: PayloadAction<Type.Note>) => {
      state.note[action.payload.id] = parseNote(action.payload);
      state.loading.updateNote = false;
      state.error.updateNote = null;
    },
    updateNoteFailure: (state, action: PayloadAction<AxiosError>) => {
      state.loading.updateNote = false;
      state.error.updateNote = action.payload;
    },
    deleteNoteRequest: (state, action: PayloadAction<number>) => {
      state.loading.deleteNote = true;
      state.error.deleteNote = null;
    },
    deleteNoteSuccess: (state) => {
      state.loading.deleteNote = false;
      state.error.deleteNote = null;
    },
    deleteNoteFailure: (state, action: PayloadAction<AxiosError>) => {
      state.loading.deleteNote = false;
      state.error.deleteNote = action.payload;
    },
    deleteNoteFromListRequest: (state, action: PayloadAction<number>) => {
      state.loading.deleteNote = true;
      state.error.deleteNote = null;
    },
  },
});

export default noteSlice;
