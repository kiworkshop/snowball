import { ThunkAction } from 'redux-thunk';
import { UserType } from './user';
import { RootState } from '../store/modules';
import { LOGIN_SUCCESS } from '../store/constants/userConstants';
import {
  INITIALIZE_NOTE_FORM,
  INITIALIZE_NOTE_INFO,
  CHANGE_ERROR,
  CHANGE_INVESTMENT_DATE,
  CHANGE_TEXT,
  GET_NOTE,
  GET_NOTE_SUCCESS,
  GET_NOTE_FAIL,
  UPDATE_NOTE,
  UPDATE_NOTE_FAIL,
  UPDATE_NOTE_SUCCESS,
  WRITE_NOTE,
  WRITE_NOTE_FAIL,
  WRITE_NOTE_SUCCESS,
} from '../store/constants/noteConstants';

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

  type NoteAction =
    | { type: typeof LOGIN_SUCCESS; payload: UserType.UserInfo }
    | { type: typeof INITIALIZE_NOTE_FORM }
    | { type: typeof INITIALIZE_NOTE_INFO }
    | { type: typeof CHANGE_INVESTMENT_DATE; payload: string }
    | { type: typeof CHANGE_TEXT; payload: string }
    | { type: typeof CHANGE_ERROR; payload: string }
    | { type: typeof GET_NOTE }
    | { type: typeof GET_NOTE_SUCCESS; payload: Note }
    | { type: typeof GET_NOTE_FAIL; payload: string }
    | { type: typeof WRITE_NOTE }
    | { type: typeof WRITE_NOTE_SUCCESS }
    | { type: typeof WRITE_NOTE_FAIL; payload: string }
    | { type: typeof UPDATE_NOTE }
    | { type: typeof UPDATE_NOTE_SUCCESS }
    | { type: typeof UPDATE_NOTE_FAIL; payload: string };

  type ThunkResult<R> = ThunkAction<R, RootState, undefined, NoteAction>;
}
