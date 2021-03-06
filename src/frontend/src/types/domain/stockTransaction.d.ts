export interface StockTransaction {
  transactionType: 'BUY' | 'SELL';
  quantity: number;
  tradedPrice: number;
  stockDetail: {
    id: number;
    companyName: string;
  };
}
