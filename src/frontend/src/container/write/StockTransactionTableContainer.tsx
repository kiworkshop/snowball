import React, { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import stockTransactionSlice from '../../features/stockTransaction';
import { addCommaToNumber } from '../../lib/number';
import { stockTransactionSelector } from '../../lib/selector';
import StockTransactionTable from '../../component/write/StockTransactionTable';

interface StockTransactionTableContainerProps {
  type: 'BUY' | 'SELL';
}

const StockTransactionTableContainer: React.FC<StockTransactionTableContainerProps> = ({ type }) => {
  /**
   * redux store
   */
  const dispatch = useAppDispatch();
  const stockTransactionState = useAppSelector(stockTransactionSelector);
  const stockTransactions = stockTransactionState[type];
  const stockTransactionActions = stockTransactionSlice.actions;

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

  /**
   * functions
   */
  const onDelete = useCallback(
    (index: number) => {
      dispatch(stockTransactionActions.delete({ index, type }));
    },
    [dispatch, stockTransactionActions, type]
  );

  return <StockTransactionTable type={type} dataSource={dataSource} onDelete={onDelete} />;
};

export default StockTransactionTableContainer;
