import { action, createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { Profile } from './types';

/* ACTION CONSTANT */
export const LOGIN_REQUEST = 'user/LOGIN_REQUEST' as const;
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS' as const;
export const LOGIN_FAILURE = 'user/LOGIN_FAILURE' as const;

export const LOGOUT = 'user/LOGOUT' as const;

export const LOGIN_STORED_USER = 'user/LOGIN_STORED_USER' as const;

export const STORE_USER_TO_LOCAL_STORAGE = 'user/STORE_USER_TO_LOCAL_STORAGE' as const;

/* ACTION CREATOR */
export const logout = () => action(LOGOUT);
export const loginStoredUser = (storedUser: Profile) =>
  action(LOGIN_STORED_USER, { ...storedUser });

export const loginAsync = createAsyncAction(
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
)<undefined, Profile, AxiosError>();

export const storeUserToLocalStorage = (user: Profile) =>
  action(STORE_USER_TO_LOCAL_STORAGE, { ...user });
