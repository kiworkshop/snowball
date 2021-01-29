import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import {
  GetNotesRequestPayload,
  GetNotesSuccessPayload,
  GetNoteSuccessPayload,
  CreateNoteRequestPayload,
  UpdateNoteRequestPayload,
} from '../../../types/action/note';

/* ACTION CONSTANT */
export const GET_NOTES_REQUEST = 'user/GET_NOTES_REQUEST' as const;
export const GET_NOTES_SUCCESS = 'user/GET_NOTES_SUCCESS' as const;
export const GET_NOTES_FAILURE = 'user/GET_NOTES_FAILURE' as const;

export const GET_NOTE_REQUEST = 'note/GET_NOTE_REQUEST' as const;
export const GET_NOTE_SUCCESS = 'note/GET_NOTE_SUCCESS' as const;
export const GET_NOTE_FAILURE = 'note/GET_NOTE_FAILURE' as const;

export const CREATE_NOTE_REQUEST = 'note/CREATE_NOTE_REQUEST' as const;
export const CREATE_NOTE_SUCCESS = 'note/CREATE_NOTE_SUCCESS' as const;
export const CREATE_NOTE_FAILURE = 'note/CREATE_NOTE_FAILURE' as const;

export const UPDATE_NOTE_REQUEST = 'note/UPDATE_NOTE_REQUEST' as const;
export const UPDATE_NOTE_SUCCESS = 'note/UPDATE_NOTE_SUCCESS' as const;
export const UPDATE_NOTE_FAILURE = 'note/UPDATE_NOTE_FAILURE' as const;

export const DELETE_NOTE_REQUEST = 'note/DELETE_NOTE_REQUEST' as const;
export const DELETE_NOTE_SUCCESS = 'note/DELETE_NOTE_SUCCESS' as const;
export const DELETE_NOTE_FAILURE = 'note/DELETE_NOTE_FAILURE' as const;

/* ACTION TYPE */
export const getNotesAsync = createAsyncAction(
  GET_NOTES_REQUEST,
  GET_NOTES_SUCCESS,
  GET_NOTES_FAILURE
)<GetNotesRequestPayload, GetNotesSuccessPayload, AxiosError>();

export const getNoteAsync = createAsyncAction(
  GET_NOTE_REQUEST,
  GET_NOTE_SUCCESS,
  GET_NOTE_FAILURE
)<number, GetNoteSuccessPayload, AxiosError>();

export const createNoteAsync = createAsyncAction(
  CREATE_NOTE_REQUEST,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_FAILURE
)<CreateNoteRequestPayload, undefined, AxiosError>();

export const updateNoteAsync = createAsyncAction(
  UPDATE_NOTE_REQUEST,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAILURE
)<UpdateNoteRequestPayload, undefined, AxiosError>();

export const deleteNoteAsync = createAsyncAction(
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAILURE
)<number, undefined, AxiosError>();
