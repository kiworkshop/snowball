import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StockTransactionState, StockTransactionPayload } from '../../types/store/stockTransaction';

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
    add: (state, action: PayloadAction<StockTransactionPayload.Add>) => {
      state[action.payload.type].push(action.payload.stockTransaction);
    },
    delete: (state, action: PayloadAction<StockTransactionPayload.Delete>) => {
      state[action.payload.type].splice(action.payload.index, 1);
    },
  },
});

export default stockTransactionSlice;
