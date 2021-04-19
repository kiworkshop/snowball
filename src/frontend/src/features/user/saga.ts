import { call, put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import * as UserAPI from '../../lib/api/user';
import routes from '../../routes';
import { useUserAction } from '../../hooks';

const userAction = useUserAction();

function* getMeSaga() {
  try {
    const response: AxiosResponse = yield call(UserAPI.getMe);
    yield put(userAction.getMeSuccess(response.data));
  } catch (e) {
    yield put(userAction.getMeFailure(e));
  }
}

function* logoutSaga() {
  yield window.location.replace(routes.logout);
}

export function* userSaga() {
  yield takeEvery(userAction.getMeRequest, getMeSaga);
  yield takeEvery(userAction.logout, logoutSaga);
}
