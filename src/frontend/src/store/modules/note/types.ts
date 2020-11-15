import { ActionType } from 'typesafe-actions';
import moment from 'moment';

import * as actions from './actions';

export type NoteAction = ActionType<typeof actions>;

export interface NoteState {
  note: Note;
  notes: Notes;
  form: Form;
  loading: {
    [action: string]: boolean;
  };
  error: {
    [action: string]: Error | null;
  };
}

export type Notes = Array<Note>;

export interface Note {
  id: number | null;
  title: string;
  content: string;
  investmentDate: moment.Moment | null;
  createdDate: moment.Moment | null;
  modifiedDate: moment.Moment | null;
  stockTransactions: Array<StockTransaction>;
}

export interface Form {
  title: string;
  content: string;
  investmentDate: moment.Moment | null;
  stockTransactions: Array<{
    companyName: string;
    quantity: number;
    tradedPrice: number;
    transactionType: 'BUY' | 'SELL';
    note: number | null;
    user: number | null;
    stockDetail: {
      id: number;
    };
  }>;
}

export interface StockTransaction {
  id: number;
  transactionType: 'BUY' | 'SELL';
  quantity: number;
  tradedPrice: number;
  createdDate: moment.Moment;
  modifiedDate: moment.Moment;
  user: string | null;
  note: string | null;
  stockDetail: {
    id: number;
    companyName: string;
    itemCode: string;
    category: string;
    mainProduct: string;
    representative: string;
    marketType: string;
    settlementMonth: string;
    createdDate: moment.Moment;
    modifiedDate: moment.Moment;
    listingDate: moment.Moment;
  };
}

export interface ChangedPartsOfForm {
  title?: string;
  content?: string;
  investmentDate?: moment.Moment | null;
  stockTransactions?: Array<{
    companyName: string;
    quantity: number;
    tradedPrice: number;
    transactionType: 'BUY' | 'SELL';
    note: number | null;
    user: number | null;
    stockDetail: {
      id: number;
    };
  }>;
}
