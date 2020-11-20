import React from 'react';
import styled from 'styled-components';
import { Space, Typography, Button, Table } from 'antd';

import { Note as NoteType } from '../../store/modules/note';

import Container from '../../component/base/Container';
import { addCommaToNumber } from '../../lib/transform';

interface StockTransactionTableProps {
  type: 'BUY' | 'SELL';
  note: NoteType;
}

interface NoteProps {
  note: NoteType;
  onClickUpdateButton: () => void;
  onClickDeleteButton: () => void;
  loading: boolean;
  error: Error | null;
}

const { Title, Text } = Typography;

const NoteContainer = styled(Container)`
  background: #fff;
  padding: 30px;
`;

const StockTransactionTableContainer = styled(Space)`
  margin-bottom: 50px;
  width: 100%;

  & > div {
    padding: 0 15px;
    width: 50%;
  }
`;

const StockTransactionTable: React.FC<StockTransactionTableProps> = ({
  type,
  note,
}) => {
  const columns = [
    { title: '종목명', dataIndex: ['stockDetail', 'companyName'] },
    { title: '수량(주)', dataIndex: 'quantity' },
    { title: '단가(원)', dataIndex: 'tradedPrice' },
    { title: '거래금액(원)', dataIndex: 'transactionAmount' },
  ];

  const stockTransactionsOfType = note.stockTransactions
    .filter((stockTransaction) => stockTransaction.transactionType === type)
    .map((stockTransaction) => ({
      ...stockTransaction,
      quantity: addCommaToNumber(stockTransaction.quantity),
      tradedPrice: addCommaToNumber(stockTransaction.tradedPrice),
      transactionAmount: addCommaToNumber(
        stockTransaction.quantity * stockTransaction.tradedPrice
      ),
    }));

  return (
    <Table
      dataSource={stockTransactionsOfType}
      columns={columns}
      pagination={false}
      rowKey="id"
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

const Note: React.FC<NoteProps> = ({
  note,
  onClickUpdateButton,
  onClickDeleteButton,
  loading,
  error,
}) => {
  return (
    <NoteContainer>
      {loading ? (
        <div>로딩중...</div>
      ) : error ? (
        <div>노트가 없네요!</div>
      ) : (
        <>
          <Space
            style={{
              borderBottom: '1px solid #f5f5f5',
              justifyContent: 'space-between',
              marginBottom: '30px',
              width: '100%',
            }}
          >
            <Title>{note.title}</Title>
            <Space>
              <Button type="text" onClick={onClickUpdateButton}>
                수정
              </Button>

              <Button type="text" onClick={onClickDeleteButton}>
                삭제
              </Button>
            </Space>
          </Space>

          {note.stockTransactions.length > 0 && (
            <StockTransactionTableContainer align="start">
              <div>
                <Title level={5}>매수한 종목</Title>
                <StockTransactionTable type="BUY" note={note} />
              </div>

              <div>
                <Title level={5}>매도한 종목</Title>
                <StockTransactionTable type="SELL" note={note} />
              </div>
            </StockTransactionTableContainer>
          )}

          <div dangerouslySetInnerHTML={{ __html: note.content }} />
        </>
      )}
    </NoteContainer>
  );
};

export default Note;
