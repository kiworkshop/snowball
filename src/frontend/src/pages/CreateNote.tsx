import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/modules';
import routes from '../routes';

import NavContainer from '../container/base/NavContainer';
import EditorContainer from '../container/note/EditorContainer';

interface MatchProps {
  date: string;
}

const CreateNote: React.FC<RouteComponentProps<MatchProps>> = ({ match }) => {
  const logged = useSelector((state: RootState) => state.user.logged);

  return (
    <>
      <NavContainer />
      <EditorContainer date={match.params.date} />
      {!logged && <Redirect to={routes.login()} />}
    </>
  );
};

export default CreateNote;
