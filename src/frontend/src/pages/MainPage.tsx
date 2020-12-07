import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';
import styled from 'styled-components';

import { RootState } from '../store/modules';
import routes from '../routes';

import Container from '../component/base/Container';
import NavContainer from '../container/base/NavContainer';
import NoteListContainer from '../container/note/NoteListContainer';
import PortfolioSummaryContainer from '../container/portfolio/PortfolioSummaryContainer';

const MainPageContentContainer = styled(Container)`
  padding: 30px 0;

  @media (max-width: 575px) {
    padding: 30px 20px;
  }
`;

const MainPage = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <Layout style={{ minHeight: '100%', paddingTop: '64px' }}>
      <NavContainer selectedMenu={['home']} />

      <MainPageContentContainer>
        <PortfolioSummaryContainer />
        <NoteListContainer />
      </MainPageContentContainer>

      {!isLoggedIn && <Redirect to={routes.login()} />}
    </Layout>
  );
};

export default MainPage;
