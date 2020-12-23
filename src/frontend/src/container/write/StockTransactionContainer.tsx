import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, message } from 'antd';

import { RootState } from '../../store/modules';
import { addCommaToNumber } from '../../lib/transform';
import { getSingleStockDetail } from '../../lib/api/stockDetail';
import { setForm } from '../../store/modules/note';

import StockTransaction from '../../component/write/StockTransaction';

const StockTransactionContainer = () => {
  const { form } = useSelector((state: RootState) => state.note);

  const dispatch = useDispatch();

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

  const onDelete = useCallback(
    (index: number) => () => {
      dispatch(
        setForm({
          stockTransactions: form.stockTransactions.filter(
            (_, idx) => idx !== index
          ),
        })
      );
    },
    [dispatch, form.stockTransactions]
  );

  const [buyTypeFormInstance] = Form.useForm();
  const [sellTypeFormInstance] = Form.useForm();

  const formInstance = {
    BUY: buyTypeFormInstance,
    SELL: sellTypeFormInstance,
  };

  const [buyTypeTransactionAmount, setBuyTypeTransactionAmount] = useState(0);
  const [sellTypeTransactionAmount, setSellTypeTransactionAmount] = useState(0);

  const transactionAmount = {
    BUY: buyTypeTransactionAmount,
    SELL: sellTypeTransactionAmount,
  };

  const setTransactionAmount = {
    BUY: setBuyTypeTransactionAmount,
    SELL: setSellTypeTransactionAmount,
  };

  const onSubmit = useCallback(
    (type: 'BUY' | 'SELL') => async (values: any) => {
      try {
        const {
          data: { id: companyId },
        } = await getSingleStockDetail(values.companyName);

        dispatch(
          setForm({
            stockTransactions: form.stockTransactions.concat([
              {
                ...values,
                transactionType: type,
                note: null,
                user: null,
                stockDetail: {
                  id: companyId,
                },
              },
            ]),
          })
        );

        formInstance[type].resetFields();
        setTransactionAmount[type](0);
      } catch (err) {
        message.error('올바른 종목명을 입력해 주세요.');
      }
    },
    [dispatch, form.stockTransactions, formInstance, setTransactionAmount]
  );

  return (
    <StockTransaction
      stockTransactionDataSource={stockTransactionDataSource}
      formInstance={formInstance}
      transactionAmount={transactionAmount}
      setTransactionAmount={setTransactionAmount}
      onDelete={onDelete}
      onSubmit={onSubmit}
    />
  );
};

export default StockTransactionContainer;
