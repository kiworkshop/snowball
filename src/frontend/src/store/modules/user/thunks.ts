import store from 'store2';
import moment from 'moment';
import { UserThunkAction } from './types';
import { loginAsync, logout, loginStoredUser, getNotesAsync } from './actions';
import * as userAPI from '../../../lib/api/user';
import * as noteAPI from '../../../lib/api/note';
import { User } from '../../../type/user';

export const loginThunk = (): UserThunkAction => {
  return async (dispatch) => {
    const { request, success, failure } = loginAsync;
    dispatch(request());
    try {
      const response = await userAPI.login();

      const MILLISECONDS_OF_DAY = 1000 * 60 * 60 * 24;
      store.set('snowball-user', {
        info: response.data,
        expired: Date.now() + MILLISECONDS_OF_DAY,
      });

      dispatch(success(response.data));
    } catch (err) {
      dispatch(failure(err));
    }
  };
};

export const logoutThunk = (): UserThunkAction => {
  return (dispatch) => {
    store.remove('snowball-user');
    dispatch(logout());
  };
};

export const loginStoredUserThunk = (
  storedUser: User.Info
): UserThunkAction => {
  return (dispatch) => {
    const MILLISECONDS_OF_DAY = 1000 * 60 * 60 * 24;
    store.set('snowball-user', {
      info: { ...storedUser },
      expired: Date.now() + MILLISECONDS_OF_DAY,
    });

    dispatch(loginStoredUser(storedUser));
  };
};

export const getNotesOfUserThunk = (
  size: number,
  page: number
): UserThunkAction => {
  return async (dispatch) => {
    const { request, success, failure } = getNotesAsync;
    dispatch(request());
    try {
      const response = await noteAPI.getNotes(size, page);
      const processedNotes = await response.data.map((note) => ({
        id: note.id,
        content: note.text,
        investmentDate: moment(note.investmentDate),
        createdDate: moment(note.createdDate),
        lastModifiedDate: moment(note.lastModifiedDate),
      }));
      dispatch(success(processedNotes));
    } catch (err) {
      dispatch(failure(err));
    }
  };
};
