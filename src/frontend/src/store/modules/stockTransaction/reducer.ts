import { createReducer } from 'typesafe-actions';
import * as actions from './actions';
import { StockTransactionState } from '../../../types/state/stockTransaction';
import { StockTransactionAction } from '../../../types/action/stockTransaction';

const initialState: StockTransactionState = {
  BUY: [],
  SELL: [],
};

const stockTransaction = createReducer<
  StockTransactionState,
  StockTransactionAction
>(initialState, {
  [actions.INITIALIZE_STOCK_TRANSACTION]: (state) => ({
    BUY: [],
    SELL: [],
  }),
  [actions.ADD_STOCK_TRANSACTION]: (state, action) => ({
    ...state,
    [action.payload.type]: state[action.payload.type].concat([
      action.payload.stockTransaction,
    ]),
  }),
  [actions.DELETE_STOCK_TRANSACTION]: (state, action) => ({
    ...state,
    [action.payload.type]: state[action.payload.type].filter(
      (_, index) => index !== action.payload.index
    ),
  }),
});

export default stockTransaction;
