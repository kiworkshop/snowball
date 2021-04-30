import { call, put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import * as PortfolioAPI from '../../lib/api/portfolio';
import { usePortfolioAction } from '../../hooks';

const portfolioAction = usePortfolioAction();

function* getPortfolioSummariesSaga() {
  try {
    const response: AxiosResponse = yield call(PortfolioAPI.getPortfolioSummaries);
    yield put(portfolioAction.getPortfolioSummariesSuccess(response.data));
  } catch (e) {
    yield put(portfolioAction.getPortfolioSummariesFailure(e));
  }
}

function* getPortfolioDetailSaga() {
  try {
    const response: AxiosResponse = yield call(PortfolioAPI.getPortfolioDetail);
    yield put(portfolioAction.getPortfolioDetailSuccess(response.data.portfolioDetailStocks || []));
  } catch (e) {
    yield put(portfolioAction.getPortfolioDetailFailure(e));
  }
}

export function* portfolioSaga() {
  yield takeEvery(portfolioAction.getPortfolioSummariesRequest, getPortfolioSummariesSaga);
  yield takeEvery(portfolioAction.getPortfolioDetailRequest, getPortfolioDetailSaga);
}
