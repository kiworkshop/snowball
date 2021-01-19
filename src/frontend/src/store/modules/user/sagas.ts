import { call, put, takeEvery } from 'redux-saga/effects';
import * as userAPI from '../../../lib/api/user';
import * as history from '../../../lib/history';
import { GET_ME_REQUEST, LOGOUT, getMeAsync } from './actions';
import routes from '../../../routes';

function* getMeSaga() {
  try {
    const response = yield call(userAPI.getMe);
    yield put(getMeAsync.success(response.data));
  } catch (e) {
    console.error(e);

    if (history.browserHistory.location.pathname !== routes.login()) {
      history.push(routes.login());
    }
    yield put(getMeAsync.failure(e));
  }
}

function* logoutSaga() {
  yield history.push(routes.login());
}

export function* userSaga() {
  yield takeEvery(GET_ME_REQUEST, getMeSaga);
  yield takeEvery(LOGOUT, logoutSaga);
}
