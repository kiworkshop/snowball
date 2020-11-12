import React from 'react';
import styled from 'styled-components';
import { Space, Typography, Button } from 'antd';
import { Note as NoteType } from '../../type/note';

import Container from '../../component/base/Container';

interface NoteProps {
  note: NoteType.Note;
  onClickUpdateButton: () => void;
  onClickDeleteButton: () => void;
  loading: boolean;
  error: Error | null;
}

const { Title } = Typography;

const NoteContainer = styled(Container)`
  padding: 50px 0;
`;

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
              width: '100%',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
          >
            <Title>
              {note.investmentDate && note.investmentDate.format('YYYY-MM-DD')}{' '}
              투자노트
            </Title>
            <Space>
              <Button type="text" onClick={onClickUpdateButton}>
                수정
              </Button>

              <Button type="text" onClick={onClickDeleteButton}>
                삭제
              </Button>
            </Space>
          </Space>
          <Space>{note.content}</Space>
        </>
      )}
    </NoteContainer>
  );
};

export default Note;
