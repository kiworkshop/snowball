import { createReducer } from 'typesafe-actions';

import { PortfolioAction, PortfolioState } from './types';
import * as actions from './actions';

const initialState: PortfolioState = {
  portfolioSummaries: [],
  loading: {},
  error: {},
};

const portfolio = createReducer<PortfolioState, PortfolioAction>(initialState, {
  [actions.GET_PORTFOLIO_SUMMARIES_REQUEST]: (state) => ({
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
  [actions.GET_PORTFOLIO_SUMMARIES_SUCCESS]: (state, action) => ({
    ...state,
    portfolioSummaries: action.payload,
    loading: {
      ...state.loading,
      getPortfolioSummaries: false,
    },
  }),
  [actions.GET_PORTFOLIO_SUMMARIES_FAILURE]: (state, action) => ({
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
