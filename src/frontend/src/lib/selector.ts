import { RootState } from '../store';

export const userSelector = (state: RootState) => state.user;
export const noteSelector = (state: RootState) => state.note;
export const portfolioSelector = (state: RootState) => state.portfolio;
export const stockTransactionSelector = (state: RootState) => state.stockTransaction;
