import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';
import styled from 'styled-components';

import { RootState } from '../store/modules';
import routes from '../routes';

import NavContainer from '../container/base/NavContainer';
import CreateNoteTemplate from '../container/write/CreateNoteTemplate';
import Container from '../component/base/Container';

const CreateNotePageContentContainer = styled(Container)`
  padding: 30px 0;

  @media (max-width: 575px) {
    padding: 30px 20px;
  }
`;

const CreateNotePage = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <Layout style={{ minHeight: '100%', paddingTop: '64px' }}>
      <NavContainer selectedMenu={['createNote']} />

      <CreateNotePageContentContainer>
        <CreateNoteTemplate />
        {!isLoggedIn && <Redirect to={routes.login()} />}
      </CreateNotePageContentContainer>
    </Layout>
  );
};

export default CreateNotePage;
