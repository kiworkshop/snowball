import store from 'store2';
import { UserThunkAction } from './types';
import { loginAsync, logout, loginStoredUser } from './actions';
import * as userAPI from '../../../lib/api/user';
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
    dispatch(loginStoredUser(storedUser));
  };
};
