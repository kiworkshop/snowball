import { action, createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { Profile } from './types';

/* ACTION CONSTANT */
export const GET_ME_REQUEST = 'user/GET_ME_REQUEST' as const;
export const GET_ME_SUCCESS = 'user/GET_ME_SUCCESS' as const;
export const GET_ME_FAILURE = 'user/GET_ME_FAILURE' as const;

export const LOGOUT = 'user/LOGOUT' as const;

/* ACTION CREATOR */
export const logout = () => action(LOGOUT);

export const getMeAsync = createAsyncAction(
  GET_ME_REQUEST,
  GET_ME_SUCCESS,
  GET_ME_FAILURE
)<undefined, Profile, AxiosError>();
