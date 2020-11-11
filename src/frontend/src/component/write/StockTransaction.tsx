import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Popover,
  Row,
  Table,
  Typography,
} from 'antd';

import { RootState } from '../../store/modules';
import { setFormThunk } from '../../store/modules/note';
import { addCommaToNumber } from '../../lib/transform';
import { getSingleStockDetail } from '../../lib/api/stockDetail';

interface StockTransactionDataSource {
  index: number;
  companyName: string;
  quantity: string;
  tradedPrice: string;
  transactionAmount: string;
  transactionType: 'BUY' | 'SELL';
}

interface StockTransactionFormProps {
  type: 'BUY' | 'SELL';
}

const { Text } = Typography;

const StockTransactionForm: React.FC<StockTransactionFormProps> = ({
  type,
}) => {
  const [form] = Form.useForm();

  const [transactionAmount, setTransactionAmount] = useState(0);

  const { form: formState } = useSelector((state: RootState) => state.note);

  const dispatch = useDispatch();
  const onSubmit = useCallback(
    async (values: any) => {
      try {
        const {
          data: { id: companyId },
        } = await getSingleStockDetail(values.companyName);

        dispatch(
          setFormThunk({
            stockTransactions: formState.stockTransactions.concat([
              { ...values, id: companyId, transactionType: type },
            ]),
          })
        );
        form.resetFields();
        setTransactionAmount(0);
      } catch (err) {
        message.error('올바른 종목명을 입력해 주세요.');
      }
    },
    [dispatch, formState.stockTransactions, type, form]
  );

  const inputNumberFormatter = (value: string | number | undefined) =>
    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const onChangeInputNumber = () => {
    const newTotalPrice =
      form.getFieldValue('quantity') * form.getFieldValue('tradedPrice');
    setTransactionAmount(isNaN(newTotalPrice) ? 0 : newTotalPrice);
  };

  return (
    <Form form={form} labelCol={{ span: 6 }} onFinish={onSubmit}>
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

interface StockTransactionTableProps {
  dataSource: Array<StockTransactionDataSource>;
  type: 'BUY' | 'SELL';
}

const StockTransactionTable: React.FC<StockTransactionTableProps> = ({
  dataSource,
  type,
}) => {
  const { form } = useSelector((state: RootState) => state.note);
  const dispatch = useDispatch();
  const onDelete = useCallback(
    (index: number) => () => {
      dispatch(
        setFormThunk({
          stockTransactions: form.stockTransactions.filter(
            (_, idx) => idx !== index
          ),
        })
      );
    },
    [dispatch, form.stockTransactions]
  );

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
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      style={{ marginTop: '20px', padding: '0 15px' }}
      summary={(pageData) => {
        let totalPrice = 0;

        pageData.forEach(({ transactionAmount }) => {
          totalPrice += Number(transactionAmount.replaceAll(',', ''));
        });

        return (
          <>
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
          </>
        );
      }}
    />
  );
};

interface StockTransactionProps {
  stockTransactionDataSource: (
    type: 'BUY' | 'SELL'
  ) => Array<StockTransactionDataSource>;
}

interface StockTransactionColumnProps {
  type: 'BUY' | 'SELL';
}

const StockTransaction: React.FC<StockTransactionProps> = ({
  stockTransactionDataSource,
}) => {
  const StockTransactionColumn: React.FC<StockTransactionColumnProps> = ({
    type,
  }) => {
    return (
      <Col span={24} md={12}>
        <Popover
          content={<StockTransactionForm type={type} />}
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
            dataSource={stockTransactionDataSource(type)}
            type={type}
          />
        )}
      </Col>
    );
  };

  return (
    <Row style={{ marginBottom: '20px' }}>
      <StockTransactionColumn type="BUY" />
      <StockTransactionColumn type="SELL" />
    </Row>
  );
};

export default StockTransaction;
