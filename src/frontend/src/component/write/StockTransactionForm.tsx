import React, { useState } from 'react';
import { Button, Form, Input, InputNumber } from 'antd';

interface StockTransactionFormProps {
  onSubmit: (values: any) => void;
  transactionAmount: number;
}

const StockTransactionForm: React.FC<StockTransactionFormProps> = ({
  onSubmit,
}) => {
  const [form] = Form.useForm();

  const [transactionAmount, setTransactionAmount] = useState(0);

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      onFinish={(values) => {
        onSubmit(values);
        form.resetFields();
        setTransactionAmount(0);
      }}
    >
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
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          onChange={() => {
            const newTotalPrice =
              form.getFieldValue('quantity') *
              form.getFieldValue('tradedPrice');
            setTransactionAmount(isNaN(newTotalPrice) ? 0 : newTotalPrice);
          }}
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
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          onChange={() => {
            const newTotalPrice =
              form.getFieldValue('quantity') *
              form.getFieldValue('tradedPrice');
            setTransactionAmount(isNaN(newTotalPrice) ? 0 : newTotalPrice);
          }}
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

export default StockTransactionForm;
