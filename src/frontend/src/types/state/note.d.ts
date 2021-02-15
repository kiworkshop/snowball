import moment from 'moment';

interface StockTransaction {
  transactionType: 'BUY' | 'SELL';
  quantity: number;
  tradedPrice: number;
  stockDetail: {
    id: number;
    companyName: string;
  };
}

export interface Note {
  id: number;
  title: string;
  content: string;
  investmentDate: moment.Moment;
  createdDate: moment.Moment;
  modifiedDate: moment.Moment;
  stockTransactions: Array<StockTransaction>;
}

export interface NoteState {
  note: {
    [id: number]: Note;
  };
  notes: Array<Note>;
  loading: {
    getNotes: boolean;
    getNote: boolean;
    createNote: boolean;
    updateNote: boolean;
    deleteNote: boolean;
  };
  error: {
    getNotes: Error | null;
    getNote: Error | null;
    createNote: Error | null;
    updateNote: Error | null;
    deleteNote: Error | null;
  };
}
