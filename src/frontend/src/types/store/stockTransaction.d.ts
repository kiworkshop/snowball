export interface StockTransactionOfState {
  stockDetailId: number;
  companyName: string;
  quantity: number;
  tradedPrice: number;
  transactionType: 'BUY' | 'SELL';
}

export interface StockTransactionState {
  BUY: Array<StockTransactionOfState>;
  SELL: Array<StockTransactionOfState>;
}

export namespace StockTransactionPayload {
  interface Add {
    type: 'BUY' | 'SELL';
    stockTransaction: {
      stockDetailId: number;
      companyName: string;
      quantity: number;
      tradedPrice: number;
      transactionType: 'BUY' | 'SELL';
    };
  }

  interface Delete {
    type: 'BUY' | 'SELL';
    index: number;
  }

  type SyncNote = Array<{
    transactionType: 'BUY' | 'SELL';
    quantity: number;
    tradedPrice: number;
    stockDetail: {
      id: number;
      companyName: string;
    };
  }>;
}
