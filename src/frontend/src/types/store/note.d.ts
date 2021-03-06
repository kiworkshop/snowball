import { Note } from '../domain/note';

export interface NoteState {
  note: {
    [id: number]: Note;
  };
  notes: Array<Note>;
  loading: {
    [action: string]: boolean;
  };
  error: {
    [action: string]: Error | null;
  };
}

export namespace NotePayload {
  namespace GetNotes {
    interface Request {
      page: number;
      size: number;
    }

    interface Success {
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
  }

  namespace GetNote {
    type Request = number;

    interface Success {
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
  }

  namespace CreateNote {
    interface Request {
      title: string;
      content: string;
      investmentDate: string;
      stockTransactionRequests: Array<{
        stockDetailId: number;
        quantity: number;
        tradedPrice: number;
        transactionType: 'BUY' | 'SELL';
      }>;
    }
  }

  namespace UpdateNote {
    interface Request {
      id: number;
      form: {
        title: string;
        content: string;
        investmentDate: string;
        stockTransactionRequests: Array<{
          stockDetailId: number;
          quantity: number;
          tradedPrice: number;
          transactionType: 'BUY' | 'SELL';
        }>;
      };
    }
  }

  namespace DeleteNote {
    type Request = number;
  }
}
