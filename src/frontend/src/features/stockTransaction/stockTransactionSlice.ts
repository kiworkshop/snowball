import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Type from '../../types';

interface StockTransaction {
  stockDetailId: number;
  companyName: string;
  quantity: number;
  tradedPrice: number;
  transactionType: Type.TransactionType;
}

export interface StockTransactionState {
  BUY: Array<StockTransaction>;
  SELL: Array<StockTransaction>;
}

const initialState: StockTransactionState = {
  BUY: [],
  SELL: [],
};

const filterStockTransaction = (
  stockTransactions: Array<Type.StockTransaction>,
  transactionType: Type.TransactionType
) => stockTransactions.filter((stockTransaction) => stockTransaction.transactionType === transactionType);

const parseStockTransaction = (stockTransaction: Type.StockTransaction): StockTransaction => ({
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
        type: Type.TransactionType;
        stockTransaction: StockTransaction;
      }>
    ) => {
      state[action.payload.type].push(action.payload.stockTransaction);
    },
    delete: (
      state,
      action: PayloadAction<{
        type: Type.TransactionType;
        index: number;
      }>
    ) => {
      state[action.payload.type].splice(action.payload.index, 1);
    },
    syncNote: (state, action: PayloadAction<Array<Type.StockTransaction>>) => {
      state.BUY = filterStockTransaction(action.payload, 'BUY').map(parseStockTransaction);
      state.SELL = filterStockTransaction(action.payload, 'SELL').map(parseStockTransaction);
    },
  },
});

export default stockTransactionSlice;
