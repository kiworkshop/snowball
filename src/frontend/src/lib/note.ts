import moment, { Moment } from 'moment';

interface RawNote {
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

interface parsedNote {
  id: number;
  title: string;
  content: string;
  investmentDate: Moment;
  createdDate: Moment;
  modifiedDate: Moment;
  stockTransactions: Array<{
    quantity: number;
    tradedPrice: number;
    transactionType: 'BUY' | 'SELL';
    stockDetail: {
      id: number;
      companyName: string;
    };
  }>;
}

export const parseNote = (note: RawNote): parsedNote => {
  return {
    id: note.id,
    title: note.title,
    content: note.content,
    investmentDate: moment(note.investmentDate),
    createdDate: moment(note.createdDate),
    modifiedDate: moment(note.modifiedDate || note.createdDate),
    stockTransactions: note.stockTransactionResponses.map((res) => ({
      transactionType: res.transactionType,
      quantity: res.quantity,
      tradedPrice: res.tradedPrice,
      stockDetail: {
        id: res.stockDetailResponse.id,
        companyName: res.stockDetailResponse.companyName,
      },
    })),
  };
};
