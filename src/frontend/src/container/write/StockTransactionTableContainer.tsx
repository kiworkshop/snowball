import React, { useCallback, useMemo } from 'react';
import { addCommaToNumber } from '../../lib/number';
import { useAppDispatch, useStockTransactionAction, useStockTransactionState } from '../../hooks';
import * as Type from '../../types';
import StockTransactionTable from '../../component/write/StockTransactionTable';

interface StockTransactionTableContainerProps {
  type: Type.TransactionType;
}

const StockTransactionTableContainer: React.FC<StockTransactionTableContainerProps> = ({ type }) => {
  const dispatch = useAppDispatch();
  const stockTransactionState = useStockTransactionState();
  const stockTransactions = stockTransactionState[type];
  const stockTransactionActions = useStockTransactionAction();

  const dataSource = useMemo(
    () =>
      stockTransactions.map((stockTransaction, index) => ({
        ...stockTransaction,
        index,
        quantity: addCommaToNumber(stockTransaction.quantity),
        tradedPrice: addCommaToNumber(stockTransaction.tradedPrice),
        transactionAmount: addCommaToNumber(stockTransaction.quantity * stockTransaction.tradedPrice),
      })),
    [stockTransactions]
  );

  const onDelete = useCallback(
    (index: number) => {
      dispatch(stockTransactionActions.delete({ index, type }));
    },
    [dispatch, stockTransactionActions, type]
  );

  return <StockTransactionTable type={type} dataSource={dataSource} onDelete={onDelete} />;
};

export default StockTransactionTableContainer;
