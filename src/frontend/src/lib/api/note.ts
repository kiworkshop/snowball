import moment from 'moment';
import axios from '../axios';

export const getNotes = (size: number, page: number) =>
  axios.get<Notes>(`/notes?size=${size}&page=${page}`);

export const getNote = (id: number) => axios.get<Note>(`/notes/${id}`);

export const createNote = (form: Form) =>
  axios.post<{ id: number }>('/notes', form);

export const updateNote = (id: number, form: Form) =>
  axios.put(`/notes/${id}`, form);

export const deleteNote = (id: number) => axios.delete(`/notes/${id}`);

export interface Notes {
  content: Array<Note>;
  pageable: string;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  number: number;
  size: number;
  empty: boolean;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  investmentDate: string;
  createdDate: string;
  modifiedDate: string;
  stockTransactions: Array<StockTransaction>;
}

export interface StockTransaction {
  id: number;
  transactionType: 'BUY' | 'SELL';
  quantity: number;
  tradedPrice: number;
  createdDate: string;
  modifiedDate: string;
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
    createdDate: string;
    modifiedDate: string;
    listingDate: string;
  };
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
