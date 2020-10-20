import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/modules';

import Container from '../component/base/Container';
import CreateNoteButton from '../component/base/CreateNoteButton';
import NavContainer from '../container/base/NavContainer';
import CreateNoteBannerContainer from '../container/note/CreateNoteBannerContainer';
import NoteListContainer from '../container/note/NoteListContainer';
import routes from '../routes';

const MainPage = () => {
  const logged = useSelector((state: RootState) => state.user.logged);

  return (
    <>
      <NavContainer />
      <Container style={{ padding: '50px 0' }}>
        <CreateNoteBannerContainer />
        <NoteListContainer />
        <CreateNoteButton />
      </Container>
      {!logged && <Redirect to={routes.login()} />}
    </>
  );
};

export default MainPage;
