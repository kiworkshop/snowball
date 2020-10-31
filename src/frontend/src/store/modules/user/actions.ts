import { action, createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { User } from '../../../type/user';
import { Note } from '../../../type/note';

/* ACTION CONSTANT */
export const LOGIN_REQUEST = 'user/LOGIN_REQUEST' as const;
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS' as const;
export const LOGIN_FAILURE = 'user/LOGIN_FAILURE' as const;

export const LOGOUT = 'user/LOGOUT' as const;

export const LOGIN_STORED_USER = 'user/LOGIN_STORED_USER' as const;

export const GET_NOTES_OF_USER_REQUEST = 'user/GET_NOTES_OF_USER_REQUEST' as const;
export const GET_NOTES_OF_USER_SUCCESS = 'user/GET_NOTES_OF_USER_SUCCESS' as const;
export const GET_NOTES_OF_USER_FAILURE = 'user/GET_NOTES_OF_USER_FAILURE' as const;

/* ACTION CREATOR */
export const logout = () => action(LOGOUT);
export const loginStoredUser = (storedUser: User.Info) =>
  action(LOGIN_STORED_USER, { ...storedUser });

export const loginAsync = createAsyncAction(
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
)<undefined, User.Info, AxiosError>();

export const getNotesAsync = createAsyncAction(
  GET_NOTES_OF_USER_REQUEST,
  GET_NOTES_OF_USER_SUCCESS,
  GET_NOTES_OF_USER_FAILURE
)<undefined, Array<Note.Note>, AxiosError>();
