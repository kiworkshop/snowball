import React from 'react';
import { Button, Popover } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import StockTransactionForm from './StockTransactionForm';

interface StockTransactionAddButtonProps {
  type: 'BUY' | 'SELL';
  formInstance: FormInstance<any>;
  transactionAmount: number;
  setTransactionAmount: React.Dispatch<React.SetStateAction<number>>;
  onSubmit: (values: any) => Promise<void>;
}

const StockTransactionAddButton: React.FC<StockTransactionAddButtonProps> = ({
  type,
  formInstance,
  transactionAmount,
  setTransactionAmount,
  onSubmit,
}) => {
  return (
    <Popover
      content={
        <StockTransactionForm
          formInstance={formInstance}
          transactionAmount={transactionAmount}
          setTransactionAmount={setTransactionAmount}
          onSubmit={onSubmit}
        />
      }
      trigger="click"
      placement="bottomLeft"
    >
      <Button>
        <PlusOutlined />
        {type === 'BUY' ? '매수' : '매도'}
      </Button>
    </Popover>
  );
};

export default StockTransactionAddButton;
