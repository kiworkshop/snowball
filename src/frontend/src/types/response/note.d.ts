export interface GetNotesResponse {
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

export interface GetNoteResponse {
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

export interface CreateNoteResponse {
  id: number;
}
