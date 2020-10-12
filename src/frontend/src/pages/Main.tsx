import React from 'react';
import Container from '../component/base/Container';
import CreateNoteButton from '../component/base/CreateNoteButton';
import CreateNoteBannerContainer from '../container/note/CreateNoteBannerContainer';
import NoteListContainer from '../container/note/NoteListContainer';

const Main = () => {
  return (
    <Container style={{ padding: '50px 0' }}>
      <CreateNoteBannerContainer />
      <NoteListContainer />
      <CreateNoteButton />
    </Container>
  );
};

export default Main;
