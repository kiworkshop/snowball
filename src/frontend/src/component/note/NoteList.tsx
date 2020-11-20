import React from 'react';
import styled from 'styled-components';
import { Collapse, Button, Spin, Typography, Tag } from 'antd';
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
`;

const PanelHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
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

        <Spin spinning={loading}>
          <Collapse ghost>
            {notes.map((note) => (
              <Panel
                key={note.id!}
                header={
                  <PanelHeader>
                    <span>{note.title}</span>
                    <span>{note.investmentDate?.format('YYYY-MM-DD')}</span>
                  </PanelHeader>
                }
              >
                <ul style={{ margin: 0 }}>
                  {note.stockTransactions.map((stockTransaction) => (
                    <li key={stockTransaction.id}>
                      {stockTransaction.transactionType === 'BUY' ? (
                        <Tag color="processing">매수</Tag>
                      ) : (
                        <Tag color="error">매도</Tag>
                      )}
                      <Tag>{stockTransaction.stockDetail.companyName}</Tag>
                      <Tag>{addCommaToNumber(stockTransaction.quantity)}주</Tag>
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
                  ))}
                </ul>

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
      </NoteListWrapper>
    </>
  );
};

export default NoteList;
