import { createReducer } from 'typesafe-actions';
import moment from 'moment';
import { NoteState } from '../../../types/state/note';
import { NoteAction } from '../../../types/action/note';
import * as actions from './actions';
import { GetNoteResponse } from '../../../types/response/note';

const initialState: NoteState = {
  note: {},
  notes: [],
  loading: {
    getNotes: false,
    getNote: false,
    createNote: false,
    updateNote: false,
    deleteNote: false,
  },
  error: {
    getNotes: null,
    getNote: null,
    createNote: null,
    updateNote: null,
    deleteNote: null,
  },
};

const parseNote = (note: GetNoteResponse) => {
  return {
    id: note.id,
    title: note.title,
    content: note.content,
    investmentDate: moment(note.investmentDate),
    createdDate: moment(note.createdDate),
    modifiedDate: moment(note.modifiedDate || note.createdDate),
    stockTransactions: note.stockTransactionResponses.map((res) => ({
      transactionType: res.transactionType,
      quantity: res.quantity,
      tradedPrice: res.tradedPrice,
      stockDetail: {
        ...res.stockDetailResponse,
      },
    })),
  };
};

const note = createReducer<NoteState, NoteAction>(initialState, {
  [actions.GET_NOTES_REQUEST]: (state) => ({
    ...state,
    loading: {
      ...state.loading,
      getNotes: true,
    },
  }),
  [actions.GET_NOTES_SUCCESS]: (state, action) => ({
    ...state,
    notes: action.payload.content.map(parseNote),
    loading: {
      ...state.loading,
      getNotes: false,
    },
    error: {
      ...state.error,
      getNotes: null,
    },
  }),
  [actions.GET_NOTES_FAILURE]: (state, action) => ({
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
  [actions.GET_NOTE_REQUEST]: (state) => ({
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
  [actions.GET_NOTE_SUCCESS]: (state, action) => ({
    ...state,
    note: {
      ...state.note,
      [action.payload.id]: parseNote(action.payload),
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
  [actions.GET_NOTE_FAILURE]: (state, action) => ({
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
  [actions.CREATE_NOTE_REQUEST]: (state) => ({
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
  [actions.CREATE_NOTE_SUCCESS]: (state, action) => ({
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
  [actions.CREATE_NOTE_FAILURE]: (state, action) => ({
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
  [actions.UPDATE_NOTE_REQUEST]: (state) => ({
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
  [actions.UPDATE_NOTE_SUCCESS]: (state) => ({
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
  [actions.UPDATE_NOTE_FAILURE]: (state, action) => ({
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
  [actions.DELETE_NOTE_REQUEST]: (state) => ({
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
  [actions.DELETE_NOTE_SUCCESS]: (state) => ({
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
  [actions.DELETE_NOTE_FAILURE]: (state, action) => ({
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
