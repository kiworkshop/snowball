import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import * as Type from '../../types';

interface PortfolioState {
  portfolioSummaries: Array<Type.PortfolioSummary>;
  portfolioDetails: Array<Type.PortfolioDetail>;
  loading: {
    [action: string]: boolean;
  };
  error: {
    [action: string]: Error | null;
  };
}

const initialState: PortfolioState = {
  portfolioSummaries: [],
  portfolioDetails: [],
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
    getPortfolioSummariesSuccess: (state, action: PayloadAction<Array<Type.PortfolioSummary>>) => {
      state.portfolioSummaries = action.payload;
      state.loading.getPortfolioSummaries = false;
    },
    getPortfolioSummariesFailure: (state, action: PayloadAction<AxiosError>) => {
      state.loading.getPortfolioSummaries = false;
      state.error.getPortfolioSummaries = action.payload;
    },
    getPortfolioDetailRequest: (state) => {
      state.loading.getPortfolioDetail = true;
      state.error.getPortfolioDetail = null;
    },
    getPortfolioDetailSuccess: (state, action: PayloadAction<Array<Type.PortfolioDetail>>) => {
      state.portfolioDetails = action.payload;
      state.loading.getPortfolioDetail = false;
    },
    getPortfolioDetailFailure: (state, action: PayloadAction<AxiosError>) => {
      state.loading.getPortfolioDetail = false;
      state.error.getPortfolioDetail = action.payload;
    },
  },
});

export default portfolioSlice;
