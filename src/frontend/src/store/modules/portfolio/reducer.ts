import { createReducer } from 'typesafe-actions';

import { PortfolioAction, PortfolioState } from './types';
import {
  GET_PORTFOLIO_SUMMARIES_REQUEST,
  GET_PORTFOLIO_SUMMARIES_SUCCESS,
  GET_PORTFOLIO_SUMMARIES_FAILURE,
} from './actions';

const initialState: PortfolioState = {
  portfolioSummaries: [],
  loading: {},
  error: {},
};

const portfolio = createReducer<PortfolioState, PortfolioAction>(initialState, {
  [GET_PORTFOLIO_SUMMARIES_REQUEST]: (state) => ({
    ...state,
    loading: {
      ...state.loading,
      getPortfolioSummaries: true,
    },
    error: {
      ...state.error,
      getPortfolioSummaries: null,
    },
  }),
  [GET_PORTFOLIO_SUMMARIES_SUCCESS]: (state, action) => ({
    ...state,
    portfolioSummaries: action.payload,
    loading: {
      ...state.loading,
      getPortfolioSummaries: false,
    },
  }),
  [GET_PORTFOLIO_SUMMARIES_FAILURE]: (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      getPortfolioSummaries: false,
    },
    error: {
      ...state.error,
      getPortfolioSummaries: action.payload,
    },
  }),
});

export default portfolio;
