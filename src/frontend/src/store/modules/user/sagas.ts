import { call, put, takeEvery } from 'redux-saga/effects';
import store from 'store2';

import * as userAPI from '../../../lib/api/user';
import {
  LOGIN_REQUEST,
  STORE_USER_TO_LOCAL_STORAGE,
  loginAsync,
  storeUserToLocalStorage,
} from './actions';

function* loginSaga() {
  try {
    const response = yield call(userAPI.login);
    yield put(loginAsync.success(response.data));
    yield put(storeUserToLocalStorage(response.data));
  } catch (e) {
    yield put(loginAsync.failure(e));
  }
}

function* storeUserToLocalStorageSaga(
  action: ReturnType<typeof storeUserToLocalStorage>
) {
  const DAY_TO_MILLISECONDS = 1000 * 60 * 60 * 24;
  yield store.set('snowball-user', {
    profile: { ...action.payload },
    expired: Date.now() + DAY_TO_MILLISECONDS,
  });
}

export function* userSaga() {
  yield takeEvery(LOGIN_REQUEST, loginSaga);
  yield takeEvery(STORE_USER_TO_LOCAL_STORAGE, storeUserToLocalStorageSaga);
}
