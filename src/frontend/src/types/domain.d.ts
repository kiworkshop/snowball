export interface StockTransaction {
  transactionType: 'BUY' | 'SELL';
  quantity: number;
  tradedPrice: number;
  stockDetail: {
    id: number;
    companyName: string;
  };
}

export interface Note {
  id: number;
  title: string;
  content: string;
  investmentDate: string;
  createdDate: string;
  modifiedDate: string;
  stockTransactions: Array<StockTransaction>;
}

export interface Profile {
  id: number | null;
  name: string;
  pictureUrl: string;
}
