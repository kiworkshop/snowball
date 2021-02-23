import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useFailure, useRequest } from '../../hooks/store';
import { GetPortfolioSummariesSuccessPayload, PortfolioState } from './type';

const initialState: PortfolioState = {
  portfolioSummaries: [],
  loading: {},
  error: {},
};

const portfolioRequest = useRequest<PortfolioState>();
const portfolioFailure = useFailure<PortfolioState>();

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    getPortfolioSummariesRequest: portfolioRequest<undefined>(
      'getPortfolioSummaries'
    ),
    getPortfolioSummariesFailure: portfolioFailure('getPortfolioSummaries'),
    getPortfolioSummariesSuccess: (
      state,
      action: PayloadAction<GetPortfolioSummariesSuccessPayload>
    ) => {
      state.portfolioSummaries = action.payload;
      state.loading.getPortfolioSummaries = false;
    },
  },
});

export default portfolioSlice;
