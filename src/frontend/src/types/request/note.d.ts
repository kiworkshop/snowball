export interface CreateNoteRequest {
  title: string;
  content: string;
  investmentDate: string;
  stockTransactions: Array<{
    stockDetailId: number;
    quantity: number;
    tradedPrice: number;
    transactionType: 'BUY' | 'SELL';
  }>;
}

export interface UpdateNoteRequest {
  title: string;
  content: string;
  investmentDate: string;
  stockTransactions: Array<{
    stockDetailId: number;
    quantity: number;
    tradedPrice: number;
    transactionType: 'BUY' | 'SELL';
  }>;
}
