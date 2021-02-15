import { action } from 'typesafe-actions';
import {
  AddStockTransactionPayload,
  DeleteStockTransactionPayload,
} from '../../../types/action/stockTransaction';

/* ACTION CONSTANT */
export const INITIALIZE_STOCK_TRANSACTION =
  'stockTransaction/INITIALIZE_STOCK_TRANSACTION';

export const ADD_STOCK_TRANSACTION = 'stockTransaction/ADD_STOCK_TRANSACTION';
export const DELETE_STOCK_TRANSACTION =
  'stockTransaction/DELETE_STOCK_TRANSACTION';

/* ACTION CREATOR */
export const initializeStockTransaction = () =>
  action(INITIALIZE_STOCK_TRANSACTION);

export const addStockTransaction = (payload: AddStockTransactionPayload) =>
  action(ADD_STOCK_TRANSACTION, payload);

export const deleteStockTransaction = (
  payload: DeleteStockTransactionPayload
) => action(DELETE_STOCK_TRANSACTION, payload);
