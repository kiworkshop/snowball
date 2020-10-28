import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { RootState } from '../store/modules';
import routes from '../routes';

import UpdateNote from '../container/note/UpdateNote';

interface MatchProps {
  id: string;
}

const UpdateNotePage: React.FC<RouteComponentProps<MatchProps>> = ({
  match,
}) => {
  const { id } = match.params;
  const logged = useSelector((state: RootState) => state.user.logged);

  return (
    <>
      <UpdateNote id={id} />
      {!logged && <Redirect to={routes.login()} />}
    </>
  );
};

export default UpdateNotePage;
