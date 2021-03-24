import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import moment from 'moment';

interface Note {
  id: number;
  title: string;
  content: string;
  investmentDate: string;
  createdDate: string;
  modifiedDate: string;
  stockTransactions: Array<{
    transactionType: 'BUY' | 'SELL';
    quantity: number;
    tradedPrice: number;
    stockDetail: {
      id: number;
      companyName: string;
    };
  }>;
}

export interface NoteState {
  note: { [id: number]: Note };
  notes: Array<Note>;
  isWritingSucceeded: boolean;
  loading: { [action: string]: boolean };
  error: { [action: string]: Error | null };
}

const initialState: NoteState = {
  note: {},
  notes: [],
  isWritingSucceeded: false,
  loading: {},
  error: {},
};

const parseNote = (note: Note): Note => {
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
    initialize: (state) => {
      state.isWritingSucceeded = false;
    },
    getNotesRequest: (
      state,
      action: PayloadAction<{
        page: number;
        size: number;
      }>
    ) => {
      state.loading.getNotes = true;
      state.error.getNotes = null;
    },
    getNotesSuccess: (
      state,
      action: PayloadAction<{
        content: Array<{
          id: number;
          title: string;
          content: string;
          investmentDate: string;
          createdDate: string;
          modifiedDate: string;
          stockTransactions: Array<{
            quantity: number;
            tradedPrice: number;
            transactionType: 'BUY' | 'SELL';
            stockDetail: {
              id: number;
              companyName: string;
            };
          }>;
        }>;
        pageable: string;
        totalElements: number;
        totalPages: number;
        last: boolean;
        numberOfElements: number;
        first: boolean;
        sort: {
          sorted: boolean;
          unsorted: boolean;
          empty: boolean;
        };
        number: number;
        size: number;
        empty: boolean;
      }>
    ) => {
      state.notes = action.payload.content.map(parseNote);
      state.loading.getNotes = false;
      state.error.getNotes = null;
    },
    getNotesFailure: (state, action: PayloadAction<AxiosError>) => {
      state.loading.getNotes = false;
      state.error.getNotes = action.payload;
    },
    getNoteRequest: (state, action: PayloadAction<number>) => {
      state.loading.getNote = true;
      state.error.getNote = null;
    },
    getNoteSuccess: (
      state,
      action: PayloadAction<{
        id: number;
        title: string;
        content: string;
        investmentDate: string;
        createdDate: string;
        modifiedDate: string;
        stockTransactions: Array<{
          quantity: number;
          tradedPrice: number;
          transactionType: 'BUY' | 'SELL';
          stockDetail: {
            id: number;
            companyName: string;
          };
        }>;
      }>
    ) => {
      state.note[action.payload.id] = parseNote(action.payload);
      state.loading.getNote = false;
      state.error.getNote = null;
    },
    getNoteFailure: (state, action: PayloadAction<AxiosError>) => {
      state.loading.getNote = false;
      state.error.getNote = action.payload;
    },
    createNoteRequest: (
      state,
      action: PayloadAction<{
        title: string;
        content: string;
        investmentDate: string;
        stockTransactions: Array<{
          stockDetailId: number;
          quantity: number;
          tradedPrice: number;
          transactionType: 'BUY' | 'SELL';
        }>;
      }>
    ) => {
      state.loading.createNote = true;
      state.error.createNote = null;
    },
    createNoteSuccess: (state) => {
      state.isWritingSucceeded = true;
      state.loading.createNote = false;
      state.error.createNote = null;
    },
    createNoteFailure: (state, action: PayloadAction<AxiosError>) => {
      state.loading.createNote = false;
      state.error.createNote = action.payload;
    },
    updateNoteRequest: (
      state,
      action: PayloadAction<{
        id: number;
        form: {
          title: string;
          content: string;
          investmentDate: string;
          stockTransactions: Array<{
            stockDetailId: number;
            quantity: number;
            tradedPrice: number;
            transactionType: 'BUY' | 'SELL';
          }>;
        };
      }>
    ) => {
      state.loading.updateNote = true;
      state.error.updateNote = null;
    },
    updateNoteSuccess: (
      state,
      action: PayloadAction<{
        id: number;
        title: string;
        content: string;
        investmentDate: string;
        createdDate: string;
        modifiedDate: string;
        stockTransactions: Array<{
          quantity: number;
          tradedPrice: number;
          transactionType: 'BUY' | 'SELL';
          stockDetail: {
            id: number;
            companyName: string;
          };
        }>;
      }>
    ) => {
      state.note[action.payload.id] = parseNote(action.payload);
      state.isWritingSucceeded = true;
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
  },
});

export default noteSlice;
