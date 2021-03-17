import { StockTransaction } from '../types/domain/stockTransaction';
import { StockTransactionOfState } from '../types/store/stockTransaction';

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

export const parseStockTransactionRequests = (stockTransaction: StockTransactionOfState) => {
  return {
    stockDetailId: stockTransaction.stockDetailId,
    quantity: stockTransaction.quantity,
    tradedPrice: stockTransaction.tradedPrice,
    transactionType: stockTransaction.transactionType,
  };
};
