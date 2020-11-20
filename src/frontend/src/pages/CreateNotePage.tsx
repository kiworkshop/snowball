import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';

import { RootState } from '../store/modules';
import routes from '../routes';

import NavContainer from '../container/base/NavContainer';
import CreateNoteTemplate from '../container/write/CreateNoteTemplate';
import Container from '../component/base/Container';

const CreateNotePage = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <Layout style={{ minHeight: '100%', paddingTop: '64px' }}>
      <Container style={{ padding: '30px 0' }}>
        <NavContainer selectedMenu={['createNote']} />
        <CreateNoteTemplate />
        {!isLoggedIn && <Redirect to={routes.login()} />}
      </Container>
    </Layout>
  );
};

export default CreateNotePage;
