import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { filterStockTransaction, parseStockTransaction } from '../../lib/stockTransaction';

interface StockTransaction {
  stockDetailId: number;
  companyName: string;
  quantity: number;
  tradedPrice: number;
  transactionType: 'BUY' | 'SELL';
}

export interface StockTransactionState {
  BUY: Array<StockTransaction>;
  SELL: Array<StockTransaction>;
}

const initialState: StockTransactionState = {
  BUY: [],
  SELL: [],
};

const stockTransactionSlice = createSlice({
  name: 'stockTransaction',
  initialState,
  reducers: {
    initialize: (state) => {
      state.BUY = [];
      state.SELL = [];
    },
    add: (
      state,
      action: PayloadAction<{
        type: 'BUY' | 'SELL';
        stockTransaction: {
          stockDetailId: number;
          companyName: string;
          quantity: number;
          tradedPrice: number;
          transactionType: 'BUY' | 'SELL';
        };
      }>
    ) => {
      state[action.payload.type].push(action.payload.stockTransaction);
    },
    delete: (
      state,
      action: PayloadAction<{
        type: 'BUY' | 'SELL';
        index: number;
      }>
    ) => {
      state[action.payload.type].splice(action.payload.index, 1);
    },
    syncNote: (
      state,
      action: PayloadAction<
        Array<{
          transactionType: 'BUY' | 'SELL';
          quantity: number;
          tradedPrice: number;
          stockDetail: {
            id: number;
            companyName: string;
          };
        }>
      >
    ) => {
      state.BUY = action.payload.filter(filterStockTransaction('BUY')).map(parseStockTransaction);
      state.SELL = action.payload.filter(filterStockTransaction('SELL')).map(parseStockTransaction);
    },
  },
});

export default stockTransactionSlice;
