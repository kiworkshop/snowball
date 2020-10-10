import React from 'react';
import styled from 'styled-components';
import { List } from 'antd';
import { FolderOpenOutlined, DownOutlined } from '@ant-design/icons';
import { setDate } from '../../lib/date';

interface Note {
  id: string;
  text: string;
  investmentDate: string;
  createdDate: string;
  lastModifiedDate: string;
}

interface NoteListProps {
  notes: Array<Note>;
  selected: string;
  onClickNote: (date: string) => void;
}

const ListHeader = styled.strong`
  font-size: 1.1rem;
`;

const NoteWrapper = styled(List.Item)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: 0.3s background;

  &:hover {
    background: #f5f5f5;
  }
`;

const NoteDate = styled.div`
  align-items: center;
  display: flex;
  font-size: 1rem;
  justify-content: space-between;
  width: 100%;
`;

const NoteContentWrapper = styled.div`
  max-height: 0;
  overflow: hidden;

  &.selected {
    max-height: 500px;
    padding-top: 12px;
    transition: 0.7s max-height ease-in-out;
  }
`;

const NoteContent = styled.p`
  line-height: 1.5;
`;

const NoteList: React.FC<NoteListProps> = ({
  notes,
  selected,
  onClickNote,
}) => {
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
        <NoteWrapper onClick={() => onClickNote(note.id)}>
          <NoteDate>
            {setDate(note.investmentDate)} <DownOutlined />
          </NoteDate>
          <NoteContentWrapper
            className={selected === note.id ? 'selected' : ''}
          >
            <NoteContent>{note.text}</NoteContent>
          </NoteContentWrapper>
        </NoteWrapper>
      )}
    />
  );
};

export default NoteList;
