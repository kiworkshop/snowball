import { ActionType } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import * as actions from './actions';
import { Note } from '../../../type/note';
import { RootState } from '../index';
import { History } from 'history';

export type NoteAction = ActionType<typeof actions>;

export type NoteState = {
  note: Note.Note;
  form: Note.Form;
  loading: { [action: string]: boolean };
  error: { [action: string]: Error | null };
};

export type NoteThunkAction = ThunkAction<
  void,
  RootState,
  { history: History<unknown> },
  NoteAction
>;
