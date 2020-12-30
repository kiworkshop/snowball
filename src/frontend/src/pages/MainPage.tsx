import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import { MAX_SMALL } from '../constants/screen';
import Container from '../component/base/Container';
import NavContainer from '../container/base/NavContainer';
import NoteListContainer from '../container/note/NoteListContainer';
import PortfolioSummaryContainer from '../container/portfolio/PortfolioSummaryContainer';

const MainPageContentContainer = styled(Container)`
  padding: 30px 0;

  @media (max-width: ${MAX_SMALL}px) {
    padding: 30px 20px;
  }
`;


const MainPage = () => {
  return (
    <Layout style={{ minHeight: '100%', paddingTop: '64px' }}>
      <NavContainer selectedMenu={['home']} />
      <MainPageContentContainer>
        <PortfolioSummaryContainer />
        <NoteListContainer />
      </MainPageContentContainer>
    </Layout>
  );
};

export default MainPage;
