import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { RootState } from '../store/modules';
import routes from '../routes';

import Container from '../component/base/Container';
import NavContainer from '../container/base/NavContainer';
import UpdateNoteTemplate from '../container/write/UpdateNoteTemplate';

interface MatchProps {
  id: string;
}

const UpdateNotePage: React.FC<RouteComponentProps<MatchProps>> = ({
  match,
}) => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <Container style={{ padding: '50px 0' }}>
      <NavContainer />
      <UpdateNoteTemplate id={match.params.id} />
      {!isLoggedIn && <Redirect to={routes.login()} />}
    </Container>
  );
};

export default UpdateNotePage;
