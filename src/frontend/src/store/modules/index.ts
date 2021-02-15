import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import user, { userSaga } from './user';
import note, { noteSaga } from './note';
import portfolio, { portfolioSaga } from './portfolio';
import stockTransaction from './stockTransaction';

const rootReducer = combineReducers({
  user,
  note,
  portfolio,
  stockTransaction,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([noteSaga(), userSaga(), portfolioSaga()]);
}
