import * as actions from '../../store/modules/note/actions';
import { ActionType } from 'typesafe-actions';

export type NoteAction = ActionType<typeof actions>;

export interface GetNotesRequestPayload {
  page: number;
  size: number;
}

export interface GetNotesSuccessPayload {
  content: Array<{
    id: number;
    title: string;
    content: string;
    investmentDate: string;
    createdDate: string;
    modifiedDate: string;
    stockTransactionResponses: Array<{
      quantity: number;
      tradedPrice: number;
      transactionType: 'BUY' | 'SELL';
      stockDetailResponse: {
        id: number;
        companyName: string;
      };
    }>;
  }>;
  pageable: string;
  totalElements: number;
  totalPages: number;
  last: boolean;
  numberOfElements: number;
  first: boolean;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  number: number;
  size: number;
  empty: boolean;
}

export interface GetNoteSuccessPayload {
  id: number;
  title: string;
  content: string;
  investmentDate: string;
  createdDate: string;
  modifiedDate: string;
  stockTransactionResponses: Array<{
    quantity: number;
    tradedPrice: number;
    transactionType: 'BUY' | 'SELL';
    stockDetailResponse: {
      id: number;
      companyName: string;
    };
  }>;
}

export interface CreateNoteRequestPayload {
  title: string;
  content: string;
  investmentDate: string;
  stockTransactions: Array<{
    stockDetailId: number;
    quantity: number;
    tradedPrice: number;
    transactionType: 'BUY' | 'SELL';
  }>;
}

export interface UpdateNoteRequestPayload {
  id: number;
  form: {
    title: string;
    content: string;
    investmentDate: string;
    stockTransactions: Array<{
      stockDetailId: number;
      quantity: number;
      tradedPrice: number;
      transactionType: 'BUY' | 'SELL';
    }>;
  };
}
