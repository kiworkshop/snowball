import { ActionType } from 'typesafe-actions';
import * as actions from '../../store/modules/stockTransaction/actions';

export type StockTransactionAction = ActionType<typeof actions>;

export interface AddStockTransactionPayload {
  type: 'BUY' | 'SELL';
  stockTransaction: {
    stockDetailId: number;
    companyName: string;
    quantity: number;
    tradedPrice: number;
    transactionAmount: number;
    transactionType: 'BUY' | 'SELL';
  };
}

export interface DeleteStockTransactionPayload {
  type: 'BUY' | 'SELL';
  index: number;
}
