import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useFailure, useRequest } from '../../hooks/store';
import { PortfolioPayload, PortfolioState } from '../../types/store/portfolio';

const initialState: PortfolioState = {
  portfolioSummaries: [],
  loading: {},
  error: {},
};

const request = useRequest<PortfolioState>();
const failure = useFailure<PortfolioState>();

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    getPortfolioSummariesRequest: request<PortfolioPayload.GetPortfolioSummaries.Request>('getPortfolioSummaries'),
    getPortfolioSummariesFailure: failure('getPortfolioSummaries'),
    getPortfolioSummariesSuccess: (state, action: PayloadAction<PortfolioPayload.GetPortfolioSummaries.Success>) => {
      state.portfolioSummaries = action.payload;
      state.loading.getPortfolioSummaries = false;
    },
  },
});

export default portfolioSlice;
