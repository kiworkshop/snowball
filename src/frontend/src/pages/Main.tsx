import React from 'react';
import Container from '../component/base/Container';
import CreateNoteBannerContainer from '../container/note/CreateNoteBannerContainer';

const Main = () => {
  return (
    <Container style={{ padding: '50px 0' }}>
      <CreateNoteBannerContainer />
    </Container>
  );
};

export default Main;
