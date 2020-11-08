import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Button, Alert, Spin, Input, Row, Col, Popover } from 'antd';
import ReactQuill from 'react-quill';
import { PlusOutlined } from '@ant-design/icons';

import 'react-quill/dist/quill.snow.css';
import { Note } from '../../type/note';
import StockTransactionForm from './StockTransactionForm';
import { addCommaToNumber } from '../../lib/transform';
import StockTransactionTable from './StockTransactionTable';

interface EditorProps {
  formData: Note.Form;
  setContent: (content: string) => void;
  onSave: () => void;
  onSubmitStockTransactionForm: (type: 'BUY' | 'SELL') => (values: any) => void;
  loading: boolean;
  error: Error | null;
}

const StyledEditor = styled(ReactQuill)`
  margin-bottom: 30px;

  .ql-editor {
    min-height: 500px;
  }
`;

const TitleInput = styled(Input)`
  font-size: 38px;
  font-weight: bold;
  padding: 20px 0;
`;

const Editor: React.FC<EditorProps> = ({
  formData,
  setContent,
  onSave,
  onSubmitStockTransactionForm,
  loading,
  error,
}) => {
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],

    [{ header: 1 }, { header: 2 }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],

    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],

    ['clean'],
  ];

  const investmentDate = formData.investmentDate?.format('YYYY-MM-DD');

  const buyTypeStockTransactions = useMemo(
    () =>
      formData.stockTransactions
        .filter(
          (stockTransaction) => stockTransaction.transactionType === 'BUY'
        )
        .map((stockTransaction) => ({
          ...stockTransaction,
          quantity: addCommaToNumber(stockTransaction.quantity),
          tradedPrice: addCommaToNumber(stockTransaction.tradedPrice),
          transactionAmount: addCommaToNumber(
            stockTransaction.quantity * stockTransaction.tradedPrice
          ),
        })),
    [formData.stockTransactions]
  );

  const sellTypeStockTransactions = useMemo(
    () =>
      formData.stockTransactions
        .filter(
          (stockTransaction) => stockTransaction.transactionType === 'SELL'
        )
        .map((stockTransaction) => ({
          ...stockTransaction,
          quantity: addCommaToNumber(stockTransaction.quantity),
          tradedPrice: addCommaToNumber(stockTransaction.tradedPrice),
          transactionAmount: addCommaToNumber(
            stockTransaction.quantity * stockTransaction.tradedPrice
          ),
        })),
    [formData.stockTransactions]
  );

  return (
    <>
      <TitleInput
        type="text"
        bordered={false}
        placeholder={`${investmentDate} 투자노트`}
      />

      <Row style={{ marginBottom: '20px' }}>
        <Col span={24} md={12}>
          <Popover
            content={
              <StockTransactionForm
                onSubmit={onSubmitStockTransactionForm('BUY')}
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

          {buyTypeStockTransactions.length > 0 && (
            <StockTransactionTable
              dataSource={buyTypeStockTransactions}
              type="BUY"
            />
          )}
        </Col>

        <Col span={24} md={12}>
          <Popover
            content={
              <StockTransactionForm
                onSubmit={onSubmitStockTransactionForm('SELL')}
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

          {sellTypeStockTransactions.length > 0 && (
            <StockTransactionTable
              dataSource={sellTypeStockTransactions}
              type="SELL"
            />
          )}
        </Col>
      </Row>

      <StyledEditor
        theme="snow"
        value={formData.content}
        onChange={setContent}
        modules={{ toolbar: toolbarOptions }}
      />

      <Spin tip="저장중..." spinning={loading}>
        <Button size="large" block onClick={onSave}>
          저장하기
        </Button>
      </Spin>

      {error && (
        <Alert
          message="노트를 작성하는 도중 오류가 발생했습니다."
          type="error"
          closable
          style={{ position: 'relative', top: '-40px' }}
        />
      )}
    </>
  );
};

export default Editor;
