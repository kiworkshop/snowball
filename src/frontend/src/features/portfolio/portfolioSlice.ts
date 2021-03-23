import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface PortfolioSummary {
  companyName: string;
  averageBuyingPrice: number;
  targetPrice: number;
  earningsRate: number;
  targetEarningsRate: number;
}

export interface PortfolioState {
  portfolioSummaries: Array<PortfolioSummary>;
  loading: { [action: string]: boolean };
  error: { [action: string]: Error | null };
}

const initialState: PortfolioState = {
  portfolioSummaries: [],
  loading: {},
  error: {},
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    getPortfolioSummariesRequest: (state) => {
      state.loading.getPortfolioSummaries = true;
      state.error.getPortfolioSummaries = null;
    },
    getPortfolioSummariesSuccess: (state, action: PayloadAction<Array<PortfolioSummary>>) => {
      state.portfolioSummaries = action.payload;
      state.loading.getPortfolioSummaries = false;
    },
    getPortfolioSummariesFailure: (state, action: PayloadAction<AxiosError>) => {
      state.loading.getPortfolioSummaries = false;
      state.error.getPortfolioSummaries = action.payload;
    },
  },
});

export default portfolioSlice;
