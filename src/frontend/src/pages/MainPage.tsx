import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';

import { RootState } from '../store/modules';
import routes from '../routes';

import Container from '../component/base/Container';
import NavContainer from '../container/base/NavContainer';
import NoteListContainer from '../container/note/NoteListContainer';
import PortfolioSummaryContainer from '../container/portfolio/PortfolioSummaryContainer';

const MainPage = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <Layout style={{ height: '100%', paddingTop: '64px' }}>
      <NavContainer selectedMenu={['home']} />

      <Container style={{ padding: '30px 0' }}>
        <PortfolioSummaryContainer />
        <NoteListContainer />
      </Container>

      {!isLoggedIn && <Redirect to={routes.login()} />}
    </Layout>
  );
};

export default MainPage;
