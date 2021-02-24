import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useFailure, useRequest } from '../../hooks/store';
import { GetPortfolioSummariesSuccessPayload, PortfolioState } from './type';

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
    getPortfolioSummariesRequest: request<undefined>('getPortfolioSummaries'),
    getPortfolioSummariesFailure: failure('getPortfolioSummaries'),
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
