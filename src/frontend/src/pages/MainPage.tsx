import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';
import { RootState } from '../store/modules';
import routes from '../routes';

import NavContainer from '../container/base/NavContainer';
import NoteListContainer from '../container/note/NoteListContainer';
import Container from '../component/base/Container';

const MainPage = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <Layout style={{ background: '#fff', height: '100%', paddingTop: '64px' }}>
      <NavContainer selectedMenu={['home']} />

      <Container style={{ padding: '50px 0' }}>
        <NoteListContainer />
      </Container>

      {!isLoggedIn && <Redirect to={routes.login()} />}
    </Layout>
  );
};

export default MainPage;
