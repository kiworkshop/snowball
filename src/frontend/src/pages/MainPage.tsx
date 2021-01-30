import React from 'react';
import NoteListContainer from '../container/note/NoteListContainer';
import PortfolioSummaryContainer from '../container/portfolio/PortfolioSummaryContainer';

const MainPage = () => {
  return (
    <>
      <PortfolioSummaryContainer />
      <NoteListContainer />
    </>
  );
};

export default MainPage;
