import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';

import { PortfolioSummary } from './types';

/* ACTION CONSTANTS */
export const GET_PORTFOLIO_SUMMARIES_REQUEST = 'portfolio/GET_PORTFOLIO_SUMMARIES_REQUEST' as const;
export const GET_PORTFOLIO_SUMMARIES_SUCCESS = 'portfolio/GET_PORTFOLIO_SUMMARIES_SUCCESS' as const;
export const GET_PORTFOLIO_SUMMARIES_FAILURE = 'portfolio/GET_PORTFOLIO_SUMMARIES_FAILURE' as const;

/* ACTION TYPE */
export const getPortfolioSummariesAsync = createAsyncAction(
  GET_PORTFOLIO_SUMMARIES_REQUEST,
  GET_PORTFOLIO_SUMMARIES_SUCCESS,
  GET_PORTFOLIO_SUMMARIES_FAILURE
)<undefined, PortfolioSummary[], AxiosError>();
