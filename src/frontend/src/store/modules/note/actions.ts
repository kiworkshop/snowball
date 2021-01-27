import { action, createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { ChangedPartsOfForm } from './types';
import { $Note } from '../../../types/note';

/* ACTION CONSTANT */
export const INITIALIZE_FORM = 'note/INITIALIZE_FORM' as const;
export const INITIALIZE_NOTE = 'note/INITIALIZE_NOTE' as const;

export const SET_FORM = 'note/SET_FORM' as const;

export const SET_FORM_FOR_UPDATE_REQUEST = 'note/SET_FORM_FOR_UPDATE_REQUEST' as const;
export const SET_FORM_FOR_UPDATE_SUCCESS = 'note/SET_FORM_FOR_UPDATE_SUCCESS' as const;
export const SET_FORM_FOR_UPDATE_FAILURE = 'note/SET_FORM_FOR_UPDATE_FAILURE' as const;

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

export const GO_TO_NOTE_DETAIL_PAGE = 'note/GO_TO_NOTE_DETAIL_PAGE' as const;

/* ACTION TYPE */
export const initializeForm = () => action(INITIALIZE_FORM);
export const initializeNote = () => action(INITIALIZE_NOTE);
export const setForm = (changedPart: ChangedPartsOfForm) =>
  action(SET_FORM, { ...changedPart });

export const setFormForUpdateAsync = createAsyncAction(
  SET_FORM_FOR_UPDATE_REQUEST,
  SET_FORM_FOR_UPDATE_SUCCESS,
  SET_FORM_FOR_UPDATE_FAILURE
)<number, undefined, AxiosError>();

export const getNotesAsync = createAsyncAction(
  GET_NOTES_REQUEST,
  GET_NOTES_SUCCESS,
  GET_NOTES_FAILURE
)<{ page: number; size: number }, $Note.Notes, AxiosError>();

export const getNoteAsync = createAsyncAction(
  GET_NOTE_REQUEST,
  GET_NOTE_SUCCESS,
  GET_NOTE_FAILURE
)<number, $Note.Note, AxiosError>();

export const createNoteAsync = createAsyncAction(
  CREATE_NOTE_REQUEST,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_FAILURE
)<$Note.Form, undefined, AxiosError>();

export const updateNoteAsync = createAsyncAction(
  UPDATE_NOTE_REQUEST,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAILURE
)<{ id: number; form: $Note.Form }, undefined, AxiosError>();

export const deleteNoteAsync = createAsyncAction(
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAILURE
)<number, undefined, AxiosError>();

export const goToNoteDetailPage = (id: number) =>
  action(GO_TO_NOTE_DETAIL_PAGE, id);
