import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { Button, Alert, Spin, Input, Row, Col, Form, Space } from 'antd';
import ReactQuill from 'react-quill';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

import 'react-quill/dist/quill.snow.css';
import { Note } from '../../type/note';
import StockTransactionInput from './StockTransactionInput';

interface EditorProps {
  formData: Note.Form;
  setContent: (content: string) => void;
  onSave: () => void;
  onClickStockTransactionButton: (type: 'BUY' | 'SELL') => () => void;
  onChangeStockTransaction: (
    index: number
  ) => (e: ChangeEvent<HTMLInputElement>) => void;
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
  onClickStockTransactionButton,
  onChangeStockTransaction,
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

  return (
    <>
      <TitleInput
        type="text"
        bordered={false}
        placeholder={`${investmentDate} 투자노트`}
      />

      <Row style={{ marginBottom: '20px' }}>
        <Col span={24} md={12}>
          <Button onClick={onClickStockTransactionButton('BUY')}>
            <PlusOutlined />
            매수
          </Button>

          {formData.stockTransactions.map(
            (stockTransaction, index) =>
              stockTransaction.transactionType === 'BUY' && (
                <StockTransactionInput
                  state={stockTransaction}
                  onChange={onChangeStockTransaction(index)}
                  onDelete={() => console.log('deleted')}
                />
              )
          )}
        </Col>
        <Col span={24} md={12}>
          <Button onClick={onClickStockTransactionButton('SELL')}>
            <PlusOutlined />
            매도
          </Button>
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
