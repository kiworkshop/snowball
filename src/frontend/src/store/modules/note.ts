import { ThunkAction } from 'redux-thunk';
import { History } from 'history';
import { RootState } from './index';
import { addNote } from '../../lib/api/note';
import {
  INITIALIZE_NOTE_FORM,
  CHANGE_INVESTMENT_DATE,
  CHANGE_TEXT,
  CHANGE_ERROR,
  WRITE_NOTE,
  WRITE_NOTE_SUCCESS,
  WRITE_NOTE_FAIL,
} from '../constants/noteConstants';
import { LOGIN_SUCCESS } from '../constants/userConstants';

import { NoteType } from '../../type/note';
import { UserType } from '../../type/user';

// Action Type
type NoteAction =
  | { type: typeof LOGIN_SUCCESS; payload: UserType.UserInfo }
  | { type: typeof INITIALIZE_NOTE_FORM }
  | { type: typeof CHANGE_INVESTMENT_DATE; payload: string }
  | { type: typeof CHANGE_TEXT; payload: string }
  | { type: typeof CHANGE_ERROR; payload: string }
  | { type: typeof WRITE_NOTE }
  | { type: typeof WRITE_NOTE_SUCCESS }
  | { type: typeof WRITE_NOTE_FAIL; payload: string };

type ThunkResult<R> = ThunkAction<R, RootState, undefined, NoteAction>;

// Action creators
export const initializeNoteForm = (): ThunkResult<void> => (dispatch) => {
  dispatch({ type: INITIALIZE_NOTE_FORM });
};

export const changeInvestmentDate = (date: string): ThunkResult<void> => (
  dispatch
) => {
  dispatch({ type: CHANGE_INVESTMENT_DATE, payload: date });
};

export const changeText = (text: string): ThunkResult<void> => (dispatch) => {
  dispatch({ type: CHANGE_TEXT, payload: text });
};

export const changeError = (error: string): ThunkResult<void> => (dispatch) => {
  dispatch({ type: CHANGE_ERROR, payload: error });
};

export const writeNote = (
  note: NoteType.NoteForm,
  history: History
): ThunkResult<void> => async (dispatch) => {
  try {
    dispatch({ type: WRITE_NOTE });

    const {
      data: { id: createdNoteId },
    } = await addNote(note);
    history.push(`/note/${createdNoteId}`);
    dispatch({ type: WRITE_NOTE_SUCCESS });
  } catch (err) {
    dispatch({
      type: WRITE_NOTE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

// Initial state
const initialState: NoteType.NoteState = {
  noteInfo: {
    id: '',
    text: '',
    investmentDate: '',
    createdDate: '',
    lastModifiedDate: '',
  },
  noteForm: {
    text: '',
    investmentDate: '',
    user: {
      id: '',
      email: '',
      name: '',
      age: null,
      gender: '',
      pictureUrl: '',
      notes: [],
    },
  },
  loading: false,
  error: '',
};

// Reducer
function note(state: NoteType.NoteState = initialState, action: NoteAction) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        noteForm: {
          ...state.noteForm,
          user: { ...action.payload },
        },
      };

    case INITIALIZE_NOTE_FORM:
      return {
        ...state,
        noteForm: {
          ...state.noteForm,
          text: '',
          investmentDate: '',
        },
      };

    case CHANGE_INVESTMENT_DATE:
      return {
        ...state,
        noteForm: {
          ...state.noteForm,
          investmentDate: action.payload,
        },
      };

    case CHANGE_TEXT:
      return {
        ...state,
        noteForm: {
          ...state.noteForm,
          text: action.payload,
        },
      };

    case CHANGE_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case WRITE_NOTE:
      return {
        ...state,
        loading: true,
        error: '',
      };

    case WRITE_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case WRITE_NOTE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default note;
