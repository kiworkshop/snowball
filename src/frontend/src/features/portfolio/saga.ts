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

export function* portfolioSaga() {
  yield takeEvery(portfolioAction.getPortfolioSummariesRequest, getPortfolioSummariesSaga);
}
