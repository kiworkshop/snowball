import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/modules';
import { addCommaToNumber } from '../../lib/number';
import { deleteStockTransaction } from '../../store/modules/stockTransaction';
import StockTransactionTable from '../../component/write/StockTransactionTable';

interface StockTransactionTableContainerProps {
  type: 'BUY' | 'SELL';
}

const StockTransactionTableContainer: React.FC<StockTransactionTableContainerProps> = ({
  type,
}) => {
  const dispatch = useDispatch();
  const stockTransactions = useSelector(
    (state: RootState) => state.stockTransaction[type]
  );

  const dataSource = useMemo(
    () =>
      stockTransactions.map((stockTransaction, index) => ({
        ...stockTransaction,
        index,
        quantity: addCommaToNumber(stockTransaction.quantity),
        tradedPrice: addCommaToNumber(stockTransaction.tradedPrice),
        transactionAmount: addCommaToNumber(
          stockTransaction.quantity * stockTransaction.tradedPrice
        ),
      })),
    [stockTransactions]
  );

  const onDelete = useCallback(
    (index: number) => () => {
      dispatch(deleteStockTransaction({ index, type }));
    },
    [dispatch, type]
  );

  return (
    <StockTransactionTable
      type={type}
      dataSource={dataSource}
      onDelete={onDelete}
    />
  );
};

export default StockTransactionTableContainer;
