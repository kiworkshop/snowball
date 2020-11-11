export namespace NoteAPIResponse {
  interface StockTransaction {
    id: string;
    user: string;
    note: string;
    transactionType: 'BUY' | 'SELL';
    quantity: number;
    tradedPrice: number;
    stockDetail: {
      id: number;
      createdDate: string;
      modifiedDate: string;
      companyName: string;
      itemCode: string;
      category: string;
      mainProduct: string;
      listingDate: string;
      settlementMonth: string;
      representative: string;
      marketType: string;
    };
    createdDate: string;
    modifiedDate: string;
  }

  interface Note {
    id: string;
    title: string;
    content: string;
    investmentDate: string;
    createdDate: string;
    lastModifiedDate: string;
    stockTransactions: Array<StockTransaction>;
  }

  interface Notes {
    content: Array<Note>;
    pageable: string;
    totalElements: number;
    totalPages: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  }

  interface OnlyWithId {
    id: string;
  }
}
