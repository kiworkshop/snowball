import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { NoteType } from '../../type/note';

import Container from '../../component/base/Container';

interface NoteProps {
  note: NoteType.Note;
}

const { Title } = Typography;

const NoteContainer = styled(Container)`
  padding: 50px 0;
`;

const NoteWrapper = styled.div``;

const Note: React.FC<NoteProps> = ({ note }) => {
  return (
    <NoteContainer>
      <Title>{note.investmentDate} 투자노트</Title>
      <NoteWrapper>{note.text}</NoteWrapper>
    </NoteContainer>
  );
};

export default Note;
