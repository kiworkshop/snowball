export interface StockTransaction {
  stockDetailId: number;
  companyName: string;
  quantity: number;
  tradedPrice: number;
  transactionType: 'BUY' | 'SELL';
}

export interface StockTransactionState {
  BUY: Array<StockTransaction>;
  SELL: Array<StockTransaction>;
}

export interface AddStockTransactionPayload {
  type: 'BUY' | 'SELL';
  stockTransaction: {
    stockDetailId: number;
    companyName: string;
    quantity: number;
    tradedPrice: number;
    transactionAmount: number;
    transactionType: 'BUY' | 'SELL';
  };
}

export interface DeleteStockTransactionPayload {
  type: 'BUY' | 'SELL';
  index: number;
}
