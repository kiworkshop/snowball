import React from 'react';
import Container from '../component/base/Container';
import CreateNoteBannerContainer from '../container/note/CreateNoteBannerContainer';
import NoteListContainer from '../container/note/NoteListContainer';

const Main = () => {
  return (
    <Container style={{ padding: '50px 0' }}>
      <CreateNoteBannerContainer />
      <NoteListContainer />
    </Container>
  );
};

export default Main;
