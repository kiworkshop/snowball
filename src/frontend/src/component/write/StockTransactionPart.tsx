import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Popover, Row } from 'antd';

import StockTransactionForm from './StockTransactionForm';
import StockTransactionTable from './StockTransactionTable';

interface ColumnProps {
  type: 'BUY' | 'SELL';
}

interface StockTransactionProps {
  onSubmit: (type: 'BUY' | 'SELL') => (values: any) => void;
  stockTransactionDataSource: (
    type: 'BUY' | 'SELL'
  ) => Array<{
    quantity: string;
    tradedPrice: string;
    transactionAmount: string;
    companyName: string;
    transactionType: 'BUY' | 'SELL';
  }>;
  transactionAmount: { BUY: number; SELL: number };
}

const StockTransactionPart: React.FC<StockTransactionProps> = ({
  onSubmit,
  stockTransactionDataSource,
  transactionAmount,
}) => {
  const Column: React.FC<ColumnProps> = ({ type }) => {
    return (
      <Col span={24} md={12}>
        <Popover
          content={
            <StockTransactionForm
              onSubmit={onSubmit(type)}
              transactionAmount={transactionAmount[type]}
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

        {stockTransactionDataSource('BUY').length > 0 && (
          <StockTransactionTable
            dataSource={stockTransactionDataSource(type)}
            type={type}
          />
        )}
      </Col>
    );
  };

  return (
    <Row style={{ marginBottom: '20px' }}>
      <Col span={24} md={12}>
        <Popover
          content={
            <StockTransactionForm
              onSubmit={onSubmit('BUY')}
              transactionAmount={transactionAmount}
            />
          }
          trigger="click"
          placement="bottomLeft"
        >
          <Button>
            <PlusOutlined />
            매수
          </Button>
        </Popover>

        {stockTransactionDataSource('BUY').length > 0 && (
          <StockTransactionTable
            dataSource={stockTransactionDataSource('BUY')}
            type="BUY"
          />
        )}
      </Col>

      <Col span={24} md={12}>
        <Popover
          content={
            <StockTransactionForm
              onSubmit={onSubmit('SELL')}
              transactionAmount={transactionAmount}
            />
          }
          trigger="click"
          placement="bottomLeft"
        >
          <Button>
            <PlusOutlined />
            매도
          </Button>
        </Popover>

        {stockTransactionDataSource('SELL').length > 0 && (
          <StockTransactionTable
            dataSource={stockTransactionDataSource('SELL')}
            type="SELL"
          />
        )}
      </Col>
    </Row>
  );
};

export default StockTransactionPart;
