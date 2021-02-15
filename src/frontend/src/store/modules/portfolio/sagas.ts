import { call, put, takeEvery } from 'redux-saga/effects';
import * as PortfolioAPI from '../../../lib/api/portfolio';
import {
  GET_PORTFOLIO_SUMMARIES_REQUEST,
  getPortfolioSummariesAsync,
} from './actions';
import errorHandler from '../../../lib/error';

function* getPortfolioSummariesSaga() {
  try {
    const response = yield call(PortfolioAPI.getPortfolioSummaries);
    yield put(getPortfolioSummariesAsync.success(response.data));
  } catch (e) {
    errorHandler(e);
    yield put(getPortfolioSummariesAsync.failure(e));
  }
}

export function* portfolioSaga() {
  yield takeEvery(GET_PORTFOLIO_SUMMARIES_REQUEST, getPortfolioSummariesSaga);
}
