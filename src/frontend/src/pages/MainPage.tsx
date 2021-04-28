import React from 'react';
import NoteListContainer from '../container/main/NoteListContainer';
import PortfolioSummaryContainer from '../container/main/PortfolioSummaryContainer';

const MainPage = () => {
  return (
    <>
      <PortfolioSummaryContainer />
      <NoteListContainer />
    </>
  );
};

export default MainPage;
