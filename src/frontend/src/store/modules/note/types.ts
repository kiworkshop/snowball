import { ActionType } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import moment from 'moment';
import * as actions from './actions';
import { Note } from '../../../type/note';
import { RootState } from '../index';

export type NoteAction = ActionType<typeof actions>;

export type NoteState = {
  id: string;
  content: string;
  investmentDate: moment.Moment | null;
  createdDate: moment.Moment | null;
  lastModifiedDate: moment.Moment | null;
  form: Note.Form;
  loading: { [action: string]: boolean };
  error: { [action: string]: Error | null };
};

export type NoteThunkAction = ThunkAction<void, RootState, null, NoteAction>;
