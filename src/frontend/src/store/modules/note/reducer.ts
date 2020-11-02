import { createReducer } from 'typesafe-actions';
import moment from 'moment';
import { NoteAction, NoteState } from './types';
import {
  INITIALIZE_FORM,
  INITIALIZE_NOTE,
  SET_FORM,
  GET_NOTE_REQUEST,
  GET_NOTE_SUCCESS,
  GET_NOTE_FAILURE,
  CREATE_NOTE_REQUEST,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_FAILURE,
  UPDATE_NOTE_REQUEST,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAILURE,
} from './actions';

const initialState: NoteState = {
  note: {
    id: '',
    content: '',
    investmentDate: null,
    createdDate: null,
    lastModifiedDate: null,
  },
  form: {
    content: '',
    investmentDate: null,
  },
  loading: {},
  error: {},
};

const note = createReducer<NoteState, NoteAction>(initialState, {
  [INITIALIZE_FORM]: (state) => ({
    ...state,
    form: {
      content: '',
      investmentDate: null,
    },
  }),
  [INITIALIZE_NOTE]: (state) => ({
    ...state,
    note: {
      id: '',
      content: '',
      investmentDate: null,
      createdDate: null,
      lastModifiedDate: null,
    },
  }),
  [SET_FORM]: (state, action) => ({
    ...state,
    form: {
      ...state.form,
      ...action.payload,
    },
  }),
  [GET_NOTE_REQUEST]: (state) => ({
    ...state,
    loading: {
      ...state.loading,
      getNote: true,
    },
  }),
  [GET_NOTE_SUCCESS]: (state, action) => ({
    ...state,
    note: {
      id: action.payload.id,
      content: action.payload.text,
      investmentDate: moment(action.payload.investmentDate),
      createdDate: moment(action.payload.createdDate),
      lastModifiedDate: moment(action.payload.lastModifiedDate),
    },
    loading: {
      ...state.loading,
      getNote: false,
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
  }),
  [CREATE_NOTE_SUCCESS]: (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      createNote: false,
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
  [UPDATE_NOTE_REQUEST]: (state) => ({
    ...state,
    loading: {
      ...state.loading,
      updateNote: true,
    },
  }),
  [UPDATE_NOTE_SUCCESS]: (state) => ({
    ...state,
    loading: {
      ...state.loading,
      updateNote: false,
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
});

export default note;
