import { call, put, takeEvery } from 'redux-saga/effects';
import * as userAPI from '../../../lib/api/user';
import * as history from '../../../lib/history';
import errorHandler from '../../../lib/error';
import { GET_ME_REQUEST, LOGOUT, getMeAsync } from './actions';

function* getMeSaga() {
  try {
    const response = yield call(userAPI.getMe);
    yield put(getMeAsync.success(response.data));
  } catch (e) {
    errorHandler(e);
    yield put(getMeAsync.failure(e));
  }
}

function* logoutSaga() {
  yield history.push('/login');
}

export function* userSaga() {
  yield takeEvery(GET_ME_REQUEST, getMeSaga);
  yield takeEvery(LOGOUT, logoutSaga);
}
