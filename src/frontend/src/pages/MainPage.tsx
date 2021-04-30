import React from 'react';
import NoteListContainer from '../container/main/NoteListContainer';
import PortfolioDetailContainer from '../container/main/PortfolioDetailContainer';

const MainPage = () => {
  return (
    <>
      <PortfolioDetailContainer />
      <NoteListContainer />
    </>
  );
};

export default MainPage;
