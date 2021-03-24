import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StockTransaction as StockTransactionDomain } from '../../types/domain';

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

const filterStockTransaction = (stockTransactions: Array<StockTransactionDomain>, transactionType: 'BUY' | 'SELL') =>
  stockTransactions.filter((stockTransaction) => stockTransaction.transactionType === transactionType);

const parseStockTransaction = (stockTransaction: StockTransactionDomain): StockTransaction => ({
  stockDetailId: stockTransaction.stockDetail.id,
  companyName: stockTransaction.stockDetail.companyName,
  quantity: stockTransaction.quantity,
  tradedPrice: stockTransaction.tradedPrice,
  transactionType: stockTransaction.transactionType,
});

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
        stockTransaction: StockTransaction;
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
    syncNote: (state, action: PayloadAction<Array<StockTransactionDomain>>) => {
      state.BUY = filterStockTransaction(action.payload, 'BUY').map(parseStockTransaction);
      state.SELL = filterStockTransaction(action.payload, 'SELL').map(parseStockTransaction);
    },
  },
});

export default stockTransactionSlice;
