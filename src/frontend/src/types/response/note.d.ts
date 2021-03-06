export namespace NoteResponse {
  interface getMultiple {
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

  interface getSingle {
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

  interface create {
    id: number;
  }
}
