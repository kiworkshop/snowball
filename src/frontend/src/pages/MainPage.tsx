import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';
import { RootState } from '../store/modules';
import routes from '../routes';

import CreateNoteButton from '../component/base/CreateNoteButton';
import NavContainer from '../container/base/NavContainer';
import CreateNoteBannerContainer from '../container/note/CreateNoteBannerContainer';
import NoteListContainer from '../container/note/NoteListContainer';
import Container from '../component/base/Container';

const MainPage = () => {
  const logged = useSelector((state: RootState) => state.user.logged);

  return (
    <Layout style={{ background: '#fff', height: '100%', paddingTop: '64px' }}>
      <NavContainer selectedMenu={['home']} />

      <Container style={{ padding: '50px 0' }}>
        <CreateNoteBannerContainer />
        <NoteListContainer />
        <CreateNoteButton />
      </Container>

      {!logged && <Redirect to={routes.login()} />}
    </Layout>
  );
};

export default MainPage;
