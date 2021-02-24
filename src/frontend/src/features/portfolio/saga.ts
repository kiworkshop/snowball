import { call, put, takeEvery } from 'redux-saga/effects';
import * as PortfolioAPI from '../../lib/api/portfolio';
import errorHandler from '../../lib/error';
import portfolioSlice from './portfolioSlice';

const actions = portfolioSlice.actions;

function* getPortfolioSummariesSaga() {
  try {
    const response = yield call(PortfolioAPI.getPortfolioSummaries);
    yield put(actions.getPortfolioSummariesSuccess(response.data));
  } catch (e) {
    errorHandler(e);
    yield put(actions.getPortfolioSummariesFailure(e));
  }
}

export function* portfolioSaga() {
  yield takeEvery(
    actions.getPortfolioSummariesRequest,
    getPortfolioSummariesSaga
  );
}
