import { BUY, SELL } from './constants/transactionType';

/**
 * NOTE TYPE
 */

export interface Note {
  id: number;
  title: string;
  content: string;
  investmentDate: string;
  createdDate: string;
  modifiedDate: string;
  stockTransactions: Array<StockTransaction>;
}

export interface NoteForm {
  title: string;
  content: string;
  investmentDate: string;
  stockTransactions: Array<{
    stockDetailId: number;
    quantity: number;
    tradedPrice: number;
    transactionType: TransactionType;
  }>;
}

/**
 * STOCKTRANSACTION TYPE
 */

export type TransactionType = typeof BUY | typeof SELL;

export interface StockTransaction {
  transactionType: TransactionType;
  quantity: number;
  tradedPrice: number;
  stockDetail: {
    id: number;
    companyName: string;
  };
}

/**
 * PORTFOLIO TYPE
 */

export interface PortfolioSummary {
  companyName: string;
  averageBuyingPrice: number;
  targetPrice: number;
  earningsRate: number;
  targetEarningsRate: number;
}

export interface PortfolioDetail {
  companyName: string;
  averageBuyingPrice: number;
  holdingQuantity: number;
  purchaseAmount: number;
}

/**
 * USER TYPE
 */

export interface Profile {
  id: number | null;
  name: string;
  pictureUrl: string;
}
