import moment from 'moment';
import { StockTransaction } from './stockTransaction';

export interface Note {
  id: number;
  title: string;
  content: string;
  investmentDate: moment.Moment;
  createdDate: moment.Moment;
  modifiedDate: moment.Moment;
  stockTransactions: Array<StockTransaction>;
}

export type Notes = Note[];
