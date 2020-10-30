import { action, createAsyncAction } from 'typesafe-actions';
import { User } from '../../../type/user';
import { AxiosError } from 'axios';

/* ACTION CONSTANT */
export const LOGIN_REQUEST = 'user/LOGIN_REQUEST' as const;
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS' as const;
export const LOGIN_FAILURE = 'user/LOGIN_FAILURE' as const;

export const LOGOUT = 'user/LOGOUT' as const;

/* ACTION TYPE */
export const logout = () => action(LOGOUT);

export const loginAsync = createAsyncAction(
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
)<undefined, User.Info, AxiosError>();
