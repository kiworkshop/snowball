import React from 'react';
import styled from 'styled-components';
import { List, Collapse, Button, Spin, Alert } from 'antd';
import { FolderOpenOutlined, RightOutlined } from '@ant-design/icons';

import { setDate } from '../../lib/date';
import { Notes } from '../../store/modules/note';

interface NoteListProps {
  notes: Notes;
  onClickMoreInfoButton: (id: number) => () => void;
  loading: boolean;
  error: Error | null;
}

const ListHeader = styled.strong`
  font-size: 1.1rem;
`;

const NoteWrapper = styled(Collapse)`
  padding-bottom: 10px;
  & + & {
    border-top: 1px solid #f0f0f0;
  }
`;

const MoreInfoButton = styled(Button)`
  float: right;
`;

const { Panel } = Collapse;

const NoteList: React.FC<NoteListProps> = ({
  notes,
  onClickMoreInfoButton,
  loading,
  error,
}) => {
  return (
    <Spin tip="로딩중..." spinning={loading}>
      <List
        header={
          <ListHeader>
            <FolderOpenOutlined style={{ marginRight: '8px' }} />
            투자노트 목록
          </ListHeader>
        }
        bordered
        dataSource={notes}
        renderItem={(note) => (
          <NoteWrapper ghost>
            <Panel
              key={note.id!}
              header={
                note.investmentDate &&
                `${setDate(note.investmentDate)} 투자노트`
              }
            >
              <p
                style={{ height: '20px', overflow: 'hidden' }}
                dangerouslySetInnerHTML={{ __html: note.content }}
              />

              <MoreInfoButton
                type="text"
                onClick={onClickMoreInfoButton(note.id!)}
              >
                더보기 <RightOutlined />
              </MoreInfoButton>
            </Panel>
          </NoteWrapper>
        )}
      />

      {error && (
        <Alert
          type="error"
          closable
          message="투자노트 목록을 불러오는 동안 오류가 발생했습니다."
          style={{ marginTop: '16px' }}
        />
      )}
    </Spin>
  );
};

export default NoteList;
