import React from 'react';
import styled from 'styled-components';
import { List, Collapse, Button, Typography } from 'antd';
import { FolderOpenOutlined, RightOutlined } from '@ant-design/icons';
import { setDate } from '../../lib/date';

import { Note } from '../../type/note';

interface NoteListProps {
  notes: Array<Note.Note>;
  onClick: (id: string) => void;
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

const NoteList: React.FC<NoteListProps> = ({ notes, onClick }) => {
  return (
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
            key={note.id}
            header={
              note.investmentDate && `${setDate(note.investmentDate)} 투자노트`
            }
          >
            <Typography.Paragraph>{note.content}</Typography.Paragraph>
            <MoreInfoButton type="text" onClick={() => onClick(note.id)}>
              더보기 <RightOutlined />
            </MoreInfoButton>
          </Panel>
        </NoteWrapper>
      )}
    />
  );
};

export default NoteList;
