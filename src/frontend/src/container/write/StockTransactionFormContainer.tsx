import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormThunk } from '../../store/modules/note';

import { RootState } from '../../store/modules';
import { addCommaToNumber } from '../../lib/transform';

import StockTransactionPart from '../../component/write/StockTransactionPart';

const StockTransactionFormContainer = () => {
  const dispatch = useDispatch();

  const { form } = useSelector((state: RootState) => state.note);

  const [transactionAmount, setTransactionAmount] = useState({
    BUY: 0,
    SELL: 0,
  });

  const onSubmit = useCallback(
    (type: 'BUY' | 'SELL') => (values: any) => {
      dispatch(
        setFormThunk({
          stockTransactions: form.stockTransactions.concat([
            { ...values, transactionType: type },
          ]),
        })
      );
    },
    [dispatch, form.stockTransactions]
  );

  const stockTransactionDataSource = useCallback(
    (type: 'BUY' | 'SELL') =>
      form.stockTransactions
        .filter((stockTransaction) => stockTransaction.transactionType === type)
        .map((stockTransaction) => ({
          ...stockTransaction,
          quantity: addCommaToNumber(stockTransaction.quantity),
          tradedPrice: addCommaToNumber(stockTransaction.tradedPrice),
          transactionAmount: addCommaToNumber(
            stockTransaction.quantity * stockTransaction.tradedPrice
          ),
        })),
    [form.stockTransactions]
  );

  return (
    <StockTransactionPart
      onSubmit={onSubmit}
      stockTransactionDataSource={stockTransactionDataSource}
    />
  );
};

export default StockTransactionFormContainer;
