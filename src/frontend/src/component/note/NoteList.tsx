import React from 'react';
import styled from 'styled-components';
import { Collapse, Button, Spin, Typography, Tag, Empty, Alert } from 'antd';
import { RightOutlined } from '@ant-design/icons';

import { Notes } from '../../store/modules/note';
import { addCommaToNumber } from '../../lib/transform';

interface NoteListProps {
  notes: Notes;
  onClickMoreInfoButton: (id: number) => () => void;
  loading: boolean;
  error: Error | null;
}

const NoteListWrapper = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 20px;
`;

const MoreInfoButton = styled(Button)`
  float: right;
  margin-bottom: 10px;
  padding: 0;
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

const UnorderedNoteList = styled.ul`
  overflow-x: scroll;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const { Panel } = Collapse;
const { Title } = Typography;

const NoteList: React.FC<NoteListProps> = ({
  notes,
  onClickMoreInfoButton,
  loading,
  error,
}) => {
  return (
    <>
      <NoteListWrapper>
        <Title level={3} style={{ color: '#27496d', marginBottom: '30px' }}>
          투자노트 목록
        </Title>

        {notes.length > 0 ? (
          <Spin spinning={loading}>
            <Collapse ghost>
              {notes
                .sort(
                  (note1, note2) =>
                    note2.investmentDate!.valueOf() -
                    note1.investmentDate!.valueOf()
                )
                .map((note) => (
                  <Panel
                    key={note.id!}
                    header={
                      <PanelHeader>
                        <span>{note.title}</span>
                        <span>{note.investmentDate?.format('YYYY-MM-DD')}</span>
                      </PanelHeader>
                    }
                  >
                    <UnorderedNoteList>
                      {note.stockTransactions.length > 0 ? (
                        note.stockTransactions.map((stockTransaction) => (
                          <li key={stockTransaction.id}>
                            {stockTransaction.transactionType === 'BUY' ? (
                              <Tag color="processing">매수</Tag>
                            ) : (
                              <Tag color="error">매도</Tag>
                            )}
                            <Tag>
                              {stockTransaction.stockDetail.companyName}
                            </Tag>
                            <Tag>
                              {addCommaToNumber(stockTransaction.quantity)}주
                            </Tag>
                            <Tag>
                              {addCommaToNumber(stockTransaction.tradedPrice)}원
                            </Tag>
                            <Tag color="success">
                              총{' '}
                              {addCommaToNumber(
                                stockTransaction.quantity *
                                  stockTransaction.tradedPrice
                              )}
                              원
                            </Tag>
                          </li>
                        ))
                      ) : (
                        <li>거래내역이 없습니다.</li>
                      )}
                    </UnorderedNoteList>

                    <MoreInfoButton
                      type="text"
                      size="small"
                      onClick={onClickMoreInfoButton(note.id!)}
                    >
                      더보기 <RightOutlined />
                    </MoreInfoButton>
                  </Panel>
                ))}
            </Collapse>
          </Spin>
        ) : (
          <Empty style={{ padding: '50px 0' }} />
        )}

        {error && (
          <Alert
            message="Error"
            description="투자노트 목록을 불러오는 중 오류가 발생했습니다."
            type="error"
            closable
            style={{ marginTop: '30px' }}
          />
        )}
      </NoteListWrapper>
    </>
  );
};

export default NoteList;
