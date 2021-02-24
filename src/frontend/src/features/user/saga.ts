import { call, put, takeEvery } from 'redux-saga/effects';
import * as userAPI from '../../lib/api/user';
import * as history from '../../lib/history';
import routes from '../../routes';
import userSlice from './userSlice';

const actions = userSlice.actions;

function* getMeSaga() {
  try {
    const response = yield call(userAPI.getMe);
    if (history.browserHistory.location.pathname === routes.login()) {
      history.push(routes.home());
    }
    yield put(actions.getMeSuccess(response.data));
  } catch (e) {
    console.error(e);

    if (history.browserHistory.location.pathname !== routes.login()) {
      history.push(routes.login());
    }
    yield put(actions.getMeFailure(e));
  }
}

function* logoutSaga() {
  yield history.push(routes.login());
}

export function* userSaga() {
  yield takeEvery(actions.getMeRequest, getMeSaga);
  yield takeEvery(actions.logout, logoutSaga);
}
