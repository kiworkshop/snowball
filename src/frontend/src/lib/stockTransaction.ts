import { StockTransaction } from '../types/domain/stockTransaction';

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
