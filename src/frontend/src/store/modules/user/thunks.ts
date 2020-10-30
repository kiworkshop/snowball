import { ThunkAction } from 'redux-thunk';
import store from 'store2';
import { RootState } from '../index';
import { UserAction } from './types';
import { loginAsync, logout } from './actions';
import * as userAPI from '../../../lib/api/user';

export const loginThunk = (): ThunkAction<
  void,
  RootState,
  null,
  UserAction
> => {
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

export const logoutThunk = (): ThunkAction<
  void,
  RootState,
  null,
  UserAction
> => {
  return (dispatch) => {
    store.remove('snowball-user');
    dispatch(logout());
  };
};
