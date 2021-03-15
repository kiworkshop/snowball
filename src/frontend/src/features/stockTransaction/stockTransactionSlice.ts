import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { filterStockTransaction, parseStockTransaction } from '../../lib/stockTransaction';
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
    syncNote: (state, action: PayloadAction<StockTransactionPayload.SyncNote>) => {
      state.BUY = action.payload.filter(filterStockTransaction('BUY')).map(parseStockTransaction);
      state.SELL = action.payload.filter(filterStockTransaction('SELL')).map(parseStockTransaction);
    },
  },
});

export default stockTransactionSlice;
