import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AddStockTransactionPayload,
  DeleteStockTransactionPayload,
  StockTransactionState,
} from './type';

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
    add: (state, action: PayloadAction<AddStockTransactionPayload>) => {
      state[action.payload.type].push(action.payload.stockTransaction);
    },
    delete: (state, action: PayloadAction<DeleteStockTransactionPayload>) => {
      state[action.payload.type].splice(action.payload.index, 1);
    },
  },
});

export default stockTransactionSlice;
