interface StockTransaction {
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
