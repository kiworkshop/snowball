import { GetNoteResponse } from '../types/response/note';
import moment from 'moment';

export const parseNote = (note: GetNoteResponse) => {
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
        ...res.stockDetailResponse,
      },
    })),
  };
};
