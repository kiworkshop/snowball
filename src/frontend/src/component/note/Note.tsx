import React from 'react';
import styled from 'styled-components';
import { Space, Typography, Button, Table } from 'antd';

import { Note as NoteType } from '../../store/modules/note';

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
      style={{ marginBottom: '50px', whiteSpace: 'nowrap' }}
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
  );
};

const NoteContainer = styled.div`
  background: #fff;
  padding: 30px;
`;

const NoteHeader = styled(Space)`
  border-bottom: 1px solid #f5f5f5;
  justify-content: space-between;
  margin-bottom: 30px;
  width: 100%;

  @media (max-width: 767px) {
    align-items: flex-end;
    flex-direction: column;
  }
`;

const StockTransactionTableContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  width: 100%;

  & > div {
    padding: 0 15px;
    width: 50%;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 767px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const Note: React.FC<NoteProps> = ({
  note,
  onClickUpdateButton,
  onClickDeleteButton,
  loading,
  error,
}) => {
  if (loading) {
    return <div>로딩중...</div>;
  }

  if (error) {
    return <div>노트가 없네요!</div>;
  }

  return (
    <NoteContainer>
      <NoteHeader>
        <Title>{note.title}</Title>
        <Space>
          <Button type="text" onClick={onClickUpdateButton}>
            수정
          </Button>

          <Button type="text" onClick={onClickDeleteButton}>
            삭제
          </Button>
        </Space>
      </NoteHeader>

      {note.stockTransactions.length > 0 && (
        <StockTransactionTableContainer>
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
    </NoteContainer>
  );
};

export default Note;
