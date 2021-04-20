import React from 'react';
import styled from 'styled-components';
import { Space, Typography, Button } from 'antd';
import * as Type from '../../types';
import StockTransactionTable from './StockTransactionTable';

interface NoteProps {
  note: Type.Note;
  onClickUpdateButton: () => void;
  onClickDeleteButton: () => void;
  loading: boolean;
  error: Error | null;
}

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

const NoteDetail: React.FC<NoteProps> = ({ note, onClickUpdateButton, onClickDeleteButton, loading, error }) => {
  if (loading) {
    return <div>로딩중...</div>;
  }

  if (error) {
    return <div>노트가 없네요!</div>;
  }

  return (
    <NoteContainer>
      <NoteHeader>
        <Typography.Title>{note.title}</Typography.Title>
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
            <Typography.Title level={5}>매수한 종목</Typography.Title>
            <StockTransactionTable type="BUY" note={note} />
          </div>
          <div>
            <Typography.Title level={5}>매도한 종목</Typography.Title>
            <StockTransactionTable type="SELL" note={note} />
          </div>
        </StockTransactionTableContainer>
      )}

      <div dangerouslySetInnerHTML={{ __html: note.content }} />
    </NoteContainer>
  );
};

export default NoteDetail;
