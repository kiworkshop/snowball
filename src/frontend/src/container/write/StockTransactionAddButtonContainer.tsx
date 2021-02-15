import React, { useCallback, useState } from 'react';
import { Form, message } from 'antd';
import { useDispatch } from 'react-redux';
import { getSingleStockDetail } from '../../lib/api/stockDetail';
import { addStockTransaction } from '../../store/modules/stockTransaction';
import StockTransactionAddButton from '../../component/write/StockTransactionAddButton';

interface StockTransactionAddButtonContainerProps {
  type: 'BUY' | 'SELL';
}

const StockTransactionAddButtonContainer: React.FC<StockTransactionAddButtonContainerProps> = ({
  type,
}) => {
  const [formInstance] = Form.useForm();
  const [transactionAmount, setTransactionAmount] = useState(0);

  const dispatch = useDispatch();

  const onSubmit = useCallback(
    async (values: any) => {
      try {
        const response = await getSingleStockDetail(values.companyName);
        const stockDetailId = response.data.id;

        dispatch(
          addStockTransaction({
            type,
            stockTransaction: {
              ...values,
              stockDetailId,
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
    [dispatch, formInstance, setTransactionAmount, type]
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
