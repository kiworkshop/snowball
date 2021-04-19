import React, { useCallback, useState } from 'react';
import { Form, message } from 'antd';
import { useAppDispatch, useStockTransactionAction } from '../../hooks';
import { getSingleStockDetail } from '../../lib/api/stockDetail';
import * as Type from '../../types';
import StockTransactionAddButton from '../../component/write/StockTransactionAddButton';

interface StockTransactionAddButtonContainerProps {
  type: Type.TransactionType;
}

const StockTransactionAddButtonContainer: React.FC<StockTransactionAddButtonContainerProps> = ({ type }) => {
  const [formInstance] = Form.useForm();
  const [transactionAmount, setTransactionAmount] = useState(0);

  const dispatch = useAppDispatch();
  const stockTransactionActions = useStockTransactionAction();

  const onSubmit = useCallback(
    async (values: any) => {
      try {
        const response = await getSingleStockDetail(values.companyName);
        const stockDetailId = response.data.id;

        dispatch(
          stockTransactionActions.add({
            type,
            stockTransaction: {
              ...values,
              stockDetailId,
              transactionType: type,
            },
          })
        );

        formInstance.resetFields();
        setTransactionAmount(0);
      } catch (err) {
        console.error(err);
        message.error('올바른 종목명을 입력해 주세요.');
      }
    },
    [dispatch, stockTransactionActions, formInstance, setTransactionAmount, type]
  );

  return (
    <StockTransactionAddButton
      type={type}
      formInstance={formInstance}
      transactionAmount={transactionAmount}
      setTransactionAmount={setTransactionAmount}
      onSubmit={onSubmit}
    />
  );
};

export default StockTransactionAddButtonContainer;
