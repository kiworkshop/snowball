import moment from 'moment';

export namespace $Note {
  interface Note {
    id: number;
    title: string;
    content: string;
    investmentDate: string;
    createdDate: string;
    modifiedDate: string;
    stockTransactions: Array<$StockTransaction.StockTransaction>;
  }

  interface Notes {
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

  interface Form {
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
}
