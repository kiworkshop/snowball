import { call, put, takeEvery } from 'redux-saga/effects';
import * as UserAPI from '../../lib/api/user';
import routes from '../../routes';
import userSlice from './userSlice';

const actions = userSlice.actions;

function* getMeSaga() {
  try {
    const response = yield call(UserAPI.getMe);
    yield put(actions.getMeSuccess(response.data));
  } catch (e) {
    console.error(e);
    yield put(actions.getMeFailure(e));
  }
}

function* logoutSaga() {
  yield window.location.replace(routes.logout);
}

export function* userSaga() {
  yield takeEvery(actions.getMeRequest, getMeSaga);
  yield takeEvery(actions.logout, logoutSaga);
}
