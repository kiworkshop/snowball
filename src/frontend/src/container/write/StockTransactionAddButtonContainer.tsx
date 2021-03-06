import React, { useCallback, useState } from 'react';
import { Form, message } from 'antd';
import { useAppDispatch } from '../../hooks/store';
import stockTransactionSlice from '../../features/stockTransaction';
import { getSingleStockDetail } from '../../lib/api/stockDetail';
import StockTransactionAddButton from '../../component/write/StockTransactionAddButton';

interface StockTransactionAddButtonContainerProps {
  type: 'BUY' | 'SELL';
}

const StockTransactionAddButtonContainer: React.FC<StockTransactionAddButtonContainerProps> = ({ type }) => {
  /**
   * component state
   */
  const [formInstance] = Form.useForm();
  const [transactionAmount, setTransactionAmount] = useState(0);

  /**
   * redux store
   */
  const dispatch = useAppDispatch();
  const stockTransactionActions = stockTransactionSlice.actions;

  /**
   * functions
   */
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
