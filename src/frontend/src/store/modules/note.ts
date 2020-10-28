import { History } from 'history';
import {
  getNote as getNoteAPI,
  addNote,
  updateNote as updateNoteAPI,
} from '../../lib/api/note';
import {
  INITIALIZE_NOTE_FORM,
  INITIALIZE_NOTE_INFO,
  CHANGE_INVESTMENT_DATE,
  CHANGE_TEXT,
  CHANGE_ERROR,
  GET_NOTE,
  GET_NOTE_SUCCESS,
  GET_NOTE_FAIL,
  WRITE_NOTE,
  WRITE_NOTE_SUCCESS,
  WRITE_NOTE_FAIL,
  UPDATE_NOTE,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAIL,
} from '../constants/noteConstants';
import { LOGIN_SUCCESS } from '../constants/userConstants';

import { NoteType } from '../../type/note';

// Action creators
export const initializeNoteForm = (): NoteType.ThunkResult<void> => (
  dispatch
) => {
  dispatch({ type: INITIALIZE_NOTE_FORM });
};

export const initializeNoteInfo = (): NoteType.ThunkResult<void> => (
  dispatch
) => {
  dispatch({ type: INITIALIZE_NOTE_INFO });
};

export const changeInvestmentDate = (
  date: string
): NoteType.ThunkResult<void> => (dispatch) => {
  dispatch({ type: CHANGE_INVESTMENT_DATE, payload: date });
};

export const changeText = (text: string): NoteType.ThunkResult<void> => (
  dispatch
) => {
  dispatch({ type: CHANGE_TEXT, payload: text });
};

export const changeError = (error: string): NoteType.ThunkResult<void> => (
  dispatch
) => {
  dispatch({ type: CHANGE_ERROR, payload: error });
};

export const getNote = (id: string): NoteType.ThunkResult<void> => async (
  dispatch
) => {
  try {
    dispatch({ type: GET_NOTE });

    const { data: noteData } = await getNoteAPI(id);

    dispatch({ type: GET_NOTE_SUCCESS, payload: noteData });
  } catch (err) {
    dispatch({
      type: GET_NOTE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const writeNote = (
  noteFormData: NoteType.NoteForm,
  history: History
): NoteType.ThunkResult<void> => async (dispatch) => {
  try {
    dispatch({ type: WRITE_NOTE });

    const {
      data: { id: createdNoteId },
    } = await addNote(noteFormData);

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

export const updateNote = (
  noteFormData: NoteType.NoteForm,
  id: string,
  history: History
): NoteType.ThunkResult<void> => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_NOTE });

    await updateNoteAPI(id, noteFormData);

    history.push(`/note/${id}`);

    dispatch({ type: UPDATE_NOTE_SUCCESS });
  } catch (err) {
    dispatch({
      type: UPDATE_NOTE_FAIL,
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
function note(
  state: NoteType.NoteState = initialState,
  action: NoteType.NoteAction
) {
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
        loading: false,
        error: '',
      };

    case INITIALIZE_NOTE_INFO:
      return {
        ...state,
        noteInfo: {
          id: '',
          text: '',
          investmentDate: '',
          createdDate: '',
          lastModifiedDate: '',
        },
        loading: false,
        error: '',
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

    case GET_NOTE:
      return {
        ...state,
        loading: true,
      };

    case GET_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        noteInfo: { ...action.payload },
      };

    case GET_NOTE_FAIL:
      return {
        ...state,
        loading: false,
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

    case UPDATE_NOTE:
      return {
        ...state,
        loading: true,
        error: '',
      };

    case UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_NOTE_FAIL:
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
