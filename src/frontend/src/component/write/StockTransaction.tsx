import React from 'react';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Popover, Row } from 'antd';
import { FormInstance } from 'antd/lib/form';
import StockTransactionForm from './StockTransactionForm';
import StockTransactionTable from './StockTransactionTable';

interface StockTransactionDataSource {
  index: number;
  companyName: string;
  quantity: string;
  tradedPrice: string;
  transactionAmount: string;
  transactionType: 'BUY' | 'SELL';
}

interface StockTransactionProps {
  stockTransactionDataSource: (
    type: 'BUY' | 'SELL'
  ) => Array<StockTransactionDataSource>;
  formInstance: {
    BUY: FormInstance<any>;
    SELL: FormInstance<any>;
  };
  transactionAmount: {
    BUY: number;
    SELL: number;
  };
  setTransactionAmount: {
    BUY: React.Dispatch<React.SetStateAction<number>>;
    SELL: React.Dispatch<React.SetStateAction<number>>;
  };
  onDelete: (index: number) => () => void;
  onSubmit: (type: 'BUY' | 'SELL') => (values: any) => Promise<void>;
}

const StyledColumn = styled(Col)`
  margin-bottom: 20px;
`;

const StockTransaction: React.FC<StockTransactionProps> = ({
  stockTransactionDataSource,
  formInstance,
  transactionAmount,
  setTransactionAmount,
  onDelete,
  onSubmit,
}) => {
  const typeArray: Array<'BUY' | 'SELL'> = ['BUY', 'SELL'];

  return (
    <Row>
      {typeArray.map((type) => (
        <StyledColumn key={type} span={24} md={12}>
          <Popover
            content={
              <StockTransactionForm
                formInstance={formInstance[type]}
                transactionAmount={transactionAmount[type]}
                setTransactionAmount={setTransactionAmount[type]}
                onSubmit={onSubmit(type)}
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

          {stockTransactionDataSource(type).length > 0 && (
            <StockTransactionTable
              type={type}
              dataSource={stockTransactionDataSource(type)}
              onDelete={onDelete}
            />
          )}
        </StyledColumn>
      ))}
    </Row>
  );
};

export default StockTransaction;
