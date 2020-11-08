import moment from 'moment';

export namespace Note {
  interface StockTransaction {
    id: string;
    user: string;
    note: string;
    transactionType: 'BUY' | 'SELL';
    quantity: number;
    tradedPrice: number;
    stockDetail: {
      companyName: string;
    };
    createdDate: moment.Moment | null;
    modifiedDate: moment.Moment | null;
  }

  interface Note {
    id: string;
    title: string;
    content: string;
    stockTransactions: Array<StockTransaction>;
    investmentDate: moment.Moment | null;
    createdDate: moment.Moment | null;
    lastModifiedDate: moment.Moment | null;
  }

  interface StockTransactionOfForm {
    companyName: string;
    transactionType: 'BUY' | 'SELL';
    quantity: number;
    tradedPrice: number;
  }

  interface Form {
    title: string;
    content: string;
    investmentDate: moment.Moment | null;
    stockTransactions: Array<StockTransactionOfForm>;
  }

  interface ChangedPartOfForm {
    title?: string;
    content?: string;
    investmentDate?: moment.Moment | null;
    stockTransactions?: Array<StockTransactionOfForm>;
  }
}
