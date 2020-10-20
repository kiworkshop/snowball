import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/modules';
import routes from '../routes';

import NavContainer from '../container/base/NavContainer';
import CreateNote from '../container/note/CreateNote';

const CreateNotePage = () => {
  const logged = useSelector((state: RootState) => state.user.logged);

  return (
    <>
      <NavContainer />
      <CreateNote />
      {!logged && <Redirect to={routes.login()} />}
    </>
  );
};

export default CreateNotePage;
