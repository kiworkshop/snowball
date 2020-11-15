import { createReducer } from 'typesafe-actions';
import moment from 'moment';

import { NoteAction, NoteState } from './types';
import {
  INITIALIZE_FORM,
  INITIALIZE_NOTE,
  SET_FORM,
  GET_NOTES_REQUEST,
  GET_NOTES_SUCCESS,
  GET_NOTES_FAILURE,
  GET_NOTE_REQUEST,
  GET_NOTE_SUCCESS,
  GET_NOTE_FAILURE,
  CREATE_NOTE_REQUEST,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_FAILURE,
  SET_FORM_FOR_UPDATE_REQUEST,
  SET_FORM_FOR_UPDATE_SUCCESS,
  SET_FORM_FOR_UPDATE_FAILURE,
  UPDATE_NOTE_REQUEST,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAILURE,
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAILURE,
} from './actions';

const initialState: NoteState = {
  note: {
    id: null,
    title: '',
    content: '',
    investmentDate: null,
    createdDate: null,
    modifiedDate: null,
    stockTransactions: [],
  },
  notes: [],
  form: {
    title: '',
    content: '',
    investmentDate: null,
    stockTransactions: [],
  },
  loading: {},
  error: {},
};

const note = createReducer<NoteState, NoteAction>(initialState, {
  [INITIALIZE_FORM]: (state) => ({
    ...state,
    form: {
      title: '',
      content: '',
      investmentDate: null,
      stockTransactions: [],
    },
  }),
  [INITIALIZE_NOTE]: (state) => ({
    ...state,
    note: {
      id: null,
      title: '',
      content: '',
      investmentDate: null,
      createdDate: null,
      modifiedDate: null,
      stockTransactions: [],
    },
  }),
  [SET_FORM]: (state, action) => ({
    ...state,
    form: {
      ...state.form,
      ...action.payload,
    },
  }),
  [GET_NOTES_REQUEST]: (state) => ({
    ...state,
    loading: {
      ...state.loading,
      getNotes: true,
    },
  }),
  [GET_NOTES_SUCCESS]: (state, action) => ({
    ...state,
    notes: action.payload.content.map((note) => ({
      ...note,
      investmentDate: moment(note.investmentDate),
      createdDate: moment(note.createdDate),
      modifiedDate: moment(note.modifiedDate),
      stockTransactions: note.stockTransactions.map((stockTransaction) => ({
        ...stockTransaction,
        createdDate: moment(stockTransaction.createdDate),
        modifiedDate: moment(stockTransaction.modifiedDate),
        stockDetail: {
          ...stockTransaction.stockDetail,
          createdDate: moment(stockTransaction.stockDetail.createdDate),
          modifiedDate: moment(stockTransaction.stockDetail.modifiedDate),
          listingDate: moment(stockTransaction.stockDetail.listingDate),
        },
      })),
    })),
    loading: {
      ...state.loading,
      getNotes: false,
    },
    error: {
      ...state.error,
      getNotes: null,
    },
  }),
  [GET_NOTES_FAILURE]: (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      getNotes: false,
    },
    error: {
      ...state.error,
      getNotes: action.payload,
    },
  }),
  [GET_NOTE_REQUEST]: (state) => ({
    ...state,
    loading: {
      ...state.loading,
      getNote: true,
    },
    error: {
      ...state.error,
      getNote: null,
    },
  }),
  [GET_NOTE_SUCCESS]: (state, action) => ({
    ...state,
    note: {
      ...action.payload,
      investmentDate: moment(action.payload.investmentDate),
      createdDate: moment(action.payload.createdDate),
      modifiedDate: moment(action.payload.modifiedDate),
      stockTransactions: action.payload.stockTransactions.map(
        (stockTransaction) => ({
          ...stockTransaction,
          createdDate: moment(stockTransaction.createdDate),
          modifiedDate: moment(stockTransaction.modifiedDate),
          stockDetail: {
            ...stockTransaction.stockDetail,
            createdDate: moment(stockTransaction.stockDetail.createdDate),
            modifiedDate: moment(stockTransaction.stockDetail.modifiedDate),
            listingDate: moment(stockTransaction.stockDetail.listingDate),
          },
        })
      ),
    },
    loading: {
      ...state.loading,
      getNote: false,
    },
    error: {
      ...state.error,
      getNote: null,
    },
  }),
  [GET_NOTE_FAILURE]: (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      getNote: false,
    },
    error: {
      ...state.error,
      getNote: action.payload,
    },
  }),
  [CREATE_NOTE_REQUEST]: (state) => ({
    ...state,
    loading: {
      ...state.loading,
      createNote: true,
    },
    error: {
      ...state.error,
      createNote: null,
    },
  }),
  [CREATE_NOTE_SUCCESS]: (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      createNote: false,
    },
    error: {
      ...state.error,
      createNote: null,
    },
  }),
  [CREATE_NOTE_FAILURE]: (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      createNote: false,
    },
    error: {
      ...state.error,
      createNote: action.payload,
    },
  }),
  [SET_FORM_FOR_UPDATE_REQUEST]: (state) => ({
    ...state,
    loading: {
      ...state.loading,
      setFormForUpdate: true,
    },
    error: {
      ...state.error,
      setFormForUpdate: null,
    },
  }),
  [SET_FORM_FOR_UPDATE_SUCCESS]: (state) => ({
    ...state,
    loading: {
      ...state.loading,
      setFormForUpdate: false,
    },
    error: {
      ...state.error,
      setFormForUpdate: null,
    },
  }),
  [SET_FORM_FOR_UPDATE_FAILURE]: (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      setFormForUpdate: false,
    },
    error: {
      ...state.error,
      setFormForUpdate: action.payload,
    },
  }),
  [UPDATE_NOTE_REQUEST]: (state) => ({
    ...state,
    loading: {
      ...state.loading,
      updateNote: true,
    },
    error: {
      ...state.error,
      updateNote: null,
    },
  }),
  [UPDATE_NOTE_SUCCESS]: (state) => ({
    ...state,
    loading: {
      ...state.loading,
      updateNote: false,
    },
    error: {
      ...state.error,
      updateNote: null,
    },
  }),
  [UPDATE_NOTE_FAILURE]: (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      updateNote: false,
    },
    error: {
      ...state.error,
      updateNote: action.payload,
    },
  }),
  [DELETE_NOTE_REQUEST]: (state) => ({
    ...state,
    loading: {
      ...state.loading,
      deleteNote: true,
    },
    error: {
      ...state.error,
      deleteNote: null,
    },
  }),
  [DELETE_NOTE_SUCCESS]: (state) => ({
    ...state,
    loading: {
      ...state.loading,
      deleteNote: false,
    },
    error: {
      ...state.error,
      deleteNote: null,
    },
  }),
  [DELETE_NOTE_FAILURE]: (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      deleteNote: false,
    },
    error: {
      ...state.error,
      deleteNote: action.payload,
    },
  }),
});

export default note;
