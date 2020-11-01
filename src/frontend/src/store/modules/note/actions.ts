import { action, createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { Note } from '../../../type/note';

/* ACTION CONSTANT */
export const INITIALIZE_FORM = 'note/INITIALIZE_FORM' as const;
export const INITIALIZE_NOTE = 'note/INITIALIZE_NOTE' as const;

export const SET_FORM = 'note/SET_FORM' as const;

export const GET_NOTE_REQUEST = 'note/GET_NOTE_REQUEST' as const;
export const GET_NOTE_SUCCESS = 'note/GET_NOTE_SUCCESS' as const;
export const GET_NOTE_FAILURE = 'note/GET_NOTE_FAILURE' as const;

export const CREATE_NOTE_REQUEST = 'note/CREATE_NOTE_REQUEST' as const;
export const CREATE_NOTE_SUCCESS = 'note/CREATE_NOTE_SUCCESS' as const;
export const CREATE_NOTE_FAILURE = 'note/CREATE_NOTE_FAILURE' as const;

export const UPDATE_NOTE_REQUEST = 'note/UPDATE_NOTE_REQUEST' as const;
export const UPDATE_NOTE_SUCCESS = 'note/UPDATE_NOTE_SUCCESS' as const;
export const UPDATE_NOTE_FAILURE = 'note/UPDATE_NOTE_FAILURE' as const;

/* ACTION TYPE */
export const initializeForm = () => action(INITIALIZE_FORM);
export const initializeNote = () => action(INITIALIZE_NOTE);
export const setForm = (changedPart: Note.ChangedPartOfForm) =>
  action(SET_FORM, { ...changedPart });

export const getNoteAsync = createAsyncAction(
  GET_NOTE_REQUEST,
  GET_NOTE_SUCCESS,
  GET_NOTE_FAILURE
)<undefined, Note.APIResponse, AxiosError>();

export const createNoteAsync = createAsyncAction(
  CREATE_NOTE_REQUEST,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_FAILURE
)<undefined, undefined, AxiosError>();

export const updateNoteAsync = createAsyncAction(
  UPDATE_NOTE_REQUEST,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAILURE
)<undefined, undefined, AxiosError>();
