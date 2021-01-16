import { call, put, takeEvery } from 'redux-saga/effects';
import * as PortfolioAPI from '../../../lib/api/portfolio';
import {
  GET_PORTFOLIO_SUMMARIES_REQUEST,
  getPortfolioSummariesAsync,
} from './actions';
import errorHandler from '../../../lib/error';

function* getPortfolioSummariesSaga(
  action: ReturnType<typeof getPortfolioSummariesAsync.request>
) {
  try {
    const { id, page } = action.payload;
    const response = yield call(PortfolioAPI.getPortfolioSummaries, id, page);
    yield put(getPortfolioSummariesAsync.success(response.data));
  } catch (e) {
    errorHandler(e);
    yield put(getPortfolioSummariesAsync.failure(e));
  }
}

export function* portfolioSaga() {
  yield takeEvery(GET_PORTFOLIO_SUMMARIES_REQUEST, getPortfolioSummariesSaga);
}
