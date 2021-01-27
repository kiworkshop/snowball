export namespace $StockTransaction {
  interface StockTransaction {
    id: number;
    transactionType: 'BUY' | 'SELL';
    quantity: number;
    tradedPrice: number;
    createdDate: string;
    modifiedDate: string;
    user: string | null;
    note: string | null;
    stockDetail: {
      id: number;
      companyName: string;
      itemCode: string;
      category: string;
      mainProduct: string;
      representative: string;
      marketType: string;
      settlementMonth: string;
      createdDate: string;
      modifiedDate: string;
      listingDate: string;
    };
  }
}
