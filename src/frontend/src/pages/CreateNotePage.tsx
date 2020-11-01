import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/modules';
import routes from '../routes';

import NavContainer from '../container/base/NavContainer';
import CreateNote from '../container/note/CreateNote';
import Container from '../component/base/Container';

const CreateNotePage = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <Container style={{ padding: '50px 0' }}>
      <NavContainer selectedMenu={['createNote']} />
      <CreateNote />
      {!isLoggedIn && <Redirect to={routes.login()} />}
    </Container>
  );
};

export default CreateNotePage;
