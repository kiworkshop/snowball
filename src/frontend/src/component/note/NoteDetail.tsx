import React from 'react';
import styled from 'styled-components';
import { Typography, Button } from 'antd';
import * as Type from '../../types';
import * as Color from '../../constants/colors';
import StockTransactionTable from './StockTransactionTable';

interface NoteProps {
  note: Type.Note;
  onClickUpdateButton: () => void;
  onClickDeleteButton: () => void;
  loading: boolean;
  error: Error | null;
}

const Container = styled.div`
  background: ${Color.WHITE};
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  padding: 30px;
`;

const Header = styled.div`
  align-items: flex-end;
  border-bottom: 1px solid ${Color.GRAY_1};
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  width: 100%;
`;

const HeaderButtonContainer = styled.div`
  display: flex;
  margin-bottom: 0.5em;
`;

const HeaderButton = styled(Button)`
  padding: 0 8px;
`;

const StockTransactionTableContainer = styled.div``;

const NoteDetail: React.FC<NoteProps> = ({ note, onClickUpdateButton, onClickDeleteButton, loading, error }) => {
  if (loading) {
    return <div>로딩중...</div>;
  }

  if (error) {
    return <div>노트가 없네요!</div>;
  }

  return (
    <Container>
      <Header>
        <Typography.Title>{note.title}</Typography.Title>
        <HeaderButtonContainer>
          <HeaderButton type="text" onClick={onClickUpdateButton}>
            수정
          </HeaderButton>
          <HeaderButton type="text" onClick={onClickDeleteButton}>
            삭제
          </HeaderButton>
        </HeaderButtonContainer>
      </Header>

      {note.stockTransactions.length > 0 && (
        <>
          <StockTransactionTableContainer>
            <Typography.Title level={5}>매수한 종목</Typography.Title>
            <StockTransactionTable type="BUY" note={note} />
          </StockTransactionTableContainer>
          <StockTransactionTableContainer>
            <Typography.Title level={5}>매도한 종목</Typography.Title>
            <StockTransactionTable type="SELL" note={note} />
          </StockTransactionTableContainer>
        </>
      )}

      <div dangerouslySetInnerHTML={{ __html: note.content }} />
    </Container>
  );
};

export default NoteDetail;
