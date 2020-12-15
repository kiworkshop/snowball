import React from 'react';
import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Popover,
  Row,
  Table,
  Typography,
} from 'antd';

import { addCommaToNumber } from '../../lib/transform';
import { FormInstance } from 'antd/lib/form';

interface StockTransactionDataSource {
  index: number;
  companyName: string;
  quantity: string;
  tradedPrice: string;
  transactionAmount: string;
  transactionType: 'BUY' | 'SELL';
}

interface StockTransactionFormProps {
  formInstance: FormInstance<any>;
  transactionAmount: number;
  setTransactionAmount: React.Dispatch<React.SetStateAction<number>>;
  onSubmit: (values: any) => Promise<void>;
}

interface StockTransactionTableProps {
  dataSource: Array<StockTransactionDataSource>;
  type: 'BUY' | 'SELL';
  onDelete: (index: number) => () => void;
}

interface StockTransactionProps {
  stockTransactionDataSource: (
    type: 'BUY' | 'SELL'
  ) => Array<StockTransactionDataSource>;
  formInstance: { BUY: FormInstance<any>; SELL: FormInstance<any> };
  transactionAmount: { BUY: number; SELL: number };
  setTransactionAmount: {
    BUY: React.Dispatch<React.SetStateAction<number>>;
    SELL: React.Dispatch<React.SetStateAction<number>>;
  };
  onDelete: (index: number) => () => void;
  onSubmit: (type: 'BUY' | 'SELL') => (values: any) => Promise<void>;
}

const { Text } = Typography;

const StockTransactionForm: React.FC<StockTransactionFormProps> = ({
  formInstance,
  transactionAmount,
  setTransactionAmount,
  onSubmit,
}) => {
  const inputNumberFormatter = (value: string | number | undefined) =>
    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const onChangeInputNumber = () => {
    const newTotalPrice =
      formInstance.getFieldValue('quantity') *
      formInstance.getFieldValue('tradedPrice');
    setTransactionAmount(isNaN(newTotalPrice) ? 0 : newTotalPrice);
  };

  return (
    <Form form={formInstance} labelCol={{ span: 6 }} onFinish={onSubmit}>
      <Form.Item
        label="종목"
        name="companyName"
        rules={[{ required: true, message: '종목명을 입력해 주세요.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="수량(주)"
        name="quantity"
        rules={[
          { type: 'number', min: 1 },
          { required: true, message: '수량을 입력해 주세요.' },
        ]}
      >
        <InputNumber
          formatter={inputNumberFormatter}
          onChange={onChangeInputNumber}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item
        label="단가(원)"
        name="tradedPrice"
        rules={[
          { type: 'number', min: 1 },
          { required: true, message: '단가를 입력해 주세요.' },
        ]}
      >
        <InputNumber
          formatter={inputNumberFormatter}
          onChange={onChangeInputNumber}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item label="거래금액(원)">
        <Input
          value={`${transactionAmount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          disabled
          bordered={false}
          style={{ color: '#000', textAlign: 'right', width: '100%' }}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          추가
        </Button>
      </Form.Item>
    </Form>
  );
};

const StockTransactionTableWrapper = styled.div`
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StockTransactionTable: React.FC<StockTransactionTableProps> = ({
  dataSource,
  type,
  onDelete,
}) => {
  const columns = [
    { title: '종목', dataIndex: 'companyName', key: 'companyName' },
    { title: '수량(주)', dataIndex: 'quantity', key: 'quantity' },
    { title: '단가(원)', dataIndex: 'tradedPrice', key: 'tradedPrice' },
    {
      title: '거래금액(원)',
      dataIndex: 'transactionAmount',
      key: 'transactionAmount',
    },
    {
      title: '',
      dataIndex: 'delete',
      render: (_: any, item: StockTransactionDataSource) => (
        <Popconfirm
          title="정말 삭제하시겠습니까?"
          onConfirm={onDelete(item.index)}
        >
          <CloseCircleOutlined style={{ color: '#f5222d' }} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <StockTransactionTableWrapper>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        style={{ marginTop: '20px', padding: '0 15px', whiteSpace: 'nowrap' }}
        rowKey="index"
        summary={(pageData) => {
          let totalPrice = 0;

          pageData.forEach(({ transactionAmount }) => {
            totalPrice += Number(transactionAmount.replaceAll(',', ''));
          });

          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>총 거래금액</Table.Summary.Cell>
              <Table.Summary.Cell index={1} />
              <Table.Summary.Cell index={2} />
              <Table.Summary.Cell index={3}>
                <Text type={type === 'BUY' ? 'success' : 'danger'}>
                  {addCommaToNumber(totalPrice)}
                </Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
    </StockTransactionTableWrapper>
  );
};

const StockTransaction: React.FC<StockTransactionProps> = ({
  stockTransactionDataSource,
  formInstance,
  transactionAmount,
  setTransactionAmount,
  onDelete,
  onSubmit,
}) => {
  return (
    <Row>
      <Col span={24} md={12} style={{ marginBottom: '20px' }}>
        <Popover
          content={
            <StockTransactionForm
              formInstance={formInstance.BUY}
              transactionAmount={transactionAmount.BUY}
              setTransactionAmount={setTransactionAmount.BUY}
              onSubmit={onSubmit('BUY')}
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
            type={'BUY'}
            onDelete={onDelete}
          />
        )}
      </Col>

      <Col span={24} md={12} style={{ marginBottom: '20px' }}>
        <Popover
          content={
            <StockTransactionForm
              formInstance={formInstance.SELL}
              transactionAmount={transactionAmount.SELL}
              setTransactionAmount={setTransactionAmount.SELL}
              onSubmit={onSubmit('SELL')}
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
            type={'SELL'}
            onDelete={onDelete}
          />
        )}
      </Col>
    </Row>
  );
};

export default StockTransaction;
