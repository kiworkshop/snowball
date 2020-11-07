import React, { ChangeEvent, useMemo } from 'react';
import { Form, Input, Space } from 'antd';
import { Note } from '../../type/note';
import styled from 'styled-components';

interface StockTransactionInputProps {
  state: Note.StockTransactionOfForm;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
}

const StockTransactionInput: React.FC<StockTransactionInputProps> = ({
  state,
  onChange,
  onDelete,
}) => {
  const totalPrice = useMemo(() => state.quantity * state.tradedPrice, [
    state.quantity,
    state.tradedPrice,
  ]);

  return (
    <Form>
      <label htmlFor="id">
        종목
        <Input
          id="id"
          type="text"
          name="companyName"
          value={state.stockDetail.companyName}
          onChange={onChange}
          placeholder="종목"
        />
      </label>

      <Input
        type="number"
        name="quantity"
        value={state.quantity}
        min={0}
        onChange={onChange}
      />

      <Input
        type="number"
        name="tradedPrice"
        value={state.tradedPrice}
        min={0}
        onChange={onChange}
      />

      <Space>{totalPrice}</Space>
    </Form>
  );
};

export default StockTransactionInput;
