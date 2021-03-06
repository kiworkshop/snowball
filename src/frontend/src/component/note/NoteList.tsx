import React from 'react';
import styled from 'styled-components';
import { Collapse, Button, Typography, Tag, Empty } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { addCommaToNumber } from '../../lib/number';
import { MAIN_COLOR } from '../../constants/colors';
import { Note } from '../../types/domain/note';

interface NoteListProps {
  notes: Array<Note>;
  onClickMoreInfoButton: (id: number) => void;
}

const NoteListWrapper = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 20px;
`;

const NoteListTitle = styled(Typography.Title)`
  color: ${MAIN_COLOR};
  margin-bottom: 30px;
`;

const PanelHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;

  @media (max-width: 575px) {
    span:last-child {
      display: none;
    }
  }
`;

const TransactionList = styled.ul`
  overflow-x: scroll;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MoreInfoButton = styled(Button)`
  float: right;
  margin-bottom: 10px;
  padding: 0;
`;

const EmptyNoteList = styled(Empty)`
  padding: 50px 0;
`;

const NoteList: React.FC<NoteListProps> = ({ notes, onClickMoreInfoButton }) => {
  return (
    <NoteListWrapper>
      <NoteListTitle level={3}>투자노트 목록</NoteListTitle>

      {notes.length > 0 ? (
        <Collapse ghost>
          {notes
            .sort((note1, note2) => note2.investmentDate!.valueOf() - note1.investmentDate!.valueOf())
            .map((note) => (
              <Collapse.Panel
                key={note.id!}
                header={
                  <PanelHeader>
                    <span>{note.title}</span>
                    <span>{note.investmentDate?.format('YYYY-MM-DD')}</span>
                  </PanelHeader>
                }
              >
                <TransactionList>
                  {note.stockTransactions.length > 0 ? (
                    note.stockTransactions.map((stockTransaction, index) => (
                      <li key={index}>
                        {stockTransaction.transactionType === 'BUY' ? (
                          <Tag color="processing">매수</Tag>
                        ) : (
                          <Tag color="error">매도</Tag>
                        )}
                        <Tag>{stockTransaction.stockDetail.companyName}</Tag>
                        <Tag>{addCommaToNumber(stockTransaction.quantity)}주</Tag>
                        <Tag>{addCommaToNumber(stockTransaction.tradedPrice)}원</Tag>
                        <Tag color="success">
                          총 {addCommaToNumber(stockTransaction.quantity * stockTransaction.tradedPrice)}원
                        </Tag>
                      </li>
                    ))
                  ) : (
                    <li>거래내역이 없습니다.</li>
                  )}
                </TransactionList>

                <MoreInfoButton type="text" size="small" onClick={() => onClickMoreInfoButton(note.id)}>
                  더보기 <RightOutlined />
                </MoreInfoButton>
              </Collapse.Panel>
            ))}
        </Collapse>
      ) : (
        <EmptyNoteList />
      )}
    </NoteListWrapper>
  );
};

export default NoteList;
