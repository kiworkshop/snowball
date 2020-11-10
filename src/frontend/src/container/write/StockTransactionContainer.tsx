import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store/modules';
import { addCommaToNumber } from '../../lib/transform';

import StockTransaction from '../../component/write/StockTransaction';

const StockTransactionContainer = () => {
  const { form } = useSelector((state: RootState) => state.note);

  const stockTransactionDataSource = useCallback(
    (type: 'BUY' | 'SELL') =>
      form.stockTransactions
        .map((stockTransaction, index) => ({
          ...stockTransaction,
          index,
          quantity: addCommaToNumber(stockTransaction.quantity),
          tradedPrice: addCommaToNumber(stockTransaction.tradedPrice),
          transactionAmount: addCommaToNumber(
            stockTransaction.quantity * stockTransaction.tradedPrice
          ),
        }))
        .filter(
          (stockTransaction) => stockTransaction.transactionType === type
        ),
    [form.stockTransactions]
  );

  return (
    <StockTransaction stockTransactionDataSource={stockTransactionDataSource} />
  );
};

export default StockTransactionContainer;
