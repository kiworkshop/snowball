import { StockTransaction } from './stockTransaction';

export interface Note {
  id: number;
  title: string;
  content: string;
  investmentDate: string;
  createdDate: string;
  modifiedDate: string;
  stockTransactions: Array<StockTransaction>;
}

export type Notes = Note[];
