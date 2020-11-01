import {
  createNoteAsync,
  getNoteAsync,
  initializeForm,
  initializeNote,
  setForm,
  updateNoteAsync,
} from './actions';
import { NoteThunkAction } from './types';
import { Note } from '../../../type/note';
import * as noteAPI from '../../../lib/api/note';

export const initializeFormThunk = (): NoteThunkAction => {
  return (dispatch) => {
    dispatch(initializeForm());
  };
};

export const initializeNoteThunk = (): NoteThunkAction => {
  return (dispatch) => {
    dispatch(initializeNote());
  };
};

export const setFormThunk = (
  changedPartOfForm: Note.ChangedPartOfForm
): NoteThunkAction => {
  return (dispatch) => {
    dispatch(setForm(changedPartOfForm));
  };
};

export const getNoteThunk = (noteId: string): NoteThunkAction => {
  return async (dispatch) => {
    const { request, success, failure } = getNoteAsync;
    dispatch(request());
    try {
      const response = await noteAPI.getNote(noteId);
      dispatch(success(response.data));
    } catch (err) {
      dispatch(failure(err));
    }
  };
};

export const createNoteThunk = (noteForm: Note.Form): NoteThunkAction => {
  return async (dispatch, _, { history }) => {
    const { request, success, failure } = createNoteAsync;
    dispatch(request());
    try {
      const response = await noteAPI.createNote(noteForm);
      dispatch(success());
      history.push(`/note/${response.data.id}`);
    } catch (err) {
      dispatch(failure(err));
    }
  };
};

export const updateNoteThunk = (
  noteId: string,
  noteForm: Note.Form
): NoteThunkAction => {
  return async (dispatch) => {
    const { request, success, failure } = updateNoteAsync;
    dispatch(request());
    try {
      await noteAPI.updateNote(noteId, noteForm);
      dispatch(success());
    } catch (err) {
      dispatch(failure(err));
    }
  };
};
