import { StockTransaction } from '../types/domain';

export const filterStockTransaction = (type: 'BUY' | 'SELL') => (stockTransaction: StockTransaction) => {
  return stockTransaction.transactionType === type;
};

export const parseStockTransaction = (stockTransaction: StockTransaction) => {
  return {
    stockDetailId: stockTransaction.stockDetail.id,
    companyName: stockTransaction.stockDetail.companyName,
    quantity: stockTransaction.quantity,
    tradedPrice: stockTransaction.tradedPrice,
    transactionType: stockTransaction.transactionType,
  };
};

export const parseStockTransactionRequests = (stockTransaction: {
  stockDetailId: number;
  companyName: string;
  quantity: number;
  tradedPrice: number;
  transactionType: 'BUY' | 'SELL';
}) => {
  return {
    stockDetailId: stockTransaction.stockDetailId,
    quantity: stockTransaction.quantity,
    tradedPrice: stockTransaction.tradedPrice,
    transactionType: stockTransaction.transactionType,
  };
};
