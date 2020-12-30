import React, { useCallback } from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import { FormInstance } from 'antd/lib/form';
import styled from 'styled-components';
import { $black } from '../../constants/colors';

interface StockTransactionFormProps {
  formInstance: FormInstance<any>;
  transactionAmount: number;
  setTransactionAmount: React.Dispatch<React.SetStateAction<number>>;
  onSubmit: (values: any) => Promise<void>;
}


const TransactionAmountInput = styled(Input)`
  color: ${$black};
  text-align: right;
  width: 100%;
`;


const StyledInputNumber = styled(InputNumber)`
  width: 100%;
`


const StockTransactionForm: React.FC<StockTransactionFormProps> = ({
  formInstance,
  transactionAmount,
  setTransactionAmount,
  onSubmit,
}) => {
  const inputNumberFormatter = useCallback(
    (value: string | number | undefined) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','), []);

  const onChangeInputNumber = useCallback(() => {
    const newTotalPrice = formInstance.getFieldValue('quantity') * formInstance.getFieldValue('tradedPrice');
    setTransactionAmount(isNaN(newTotalPrice) ? 0 : newTotalPrice);
  }, [formInstance, setTransactionAmount]);

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
        <StyledInputNumber formatter={inputNumberFormatter} onChange={onChangeInputNumber} />
      </Form.Item>

      <Form.Item
        label="단가(원)"
        name="tradedPrice"
        rules={[
          { type: 'number', min: 1 },
          { required: true, message: '단가를 입력해 주세요.' },
        ]}
      >
        <StyledInputNumber formatter={inputNumberFormatter} onChange={onChangeInputNumber} />
      </Form.Item>

      <Form.Item label="거래금액(원)">
        <TransactionAmountInput
          value={`${transactionAmount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          disabled
          bordered={false}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>추가</Button>
      </Form.Item>
    </Form>
  );
};

export default StockTransactionForm;
