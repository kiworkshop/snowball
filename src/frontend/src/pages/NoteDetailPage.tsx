import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import NavContainer from '../container/base/NavContainer';
import NoteContainer from '../container/note/NoteContainer';

interface MatchProps {
  id: string;
}

const NoteDetailPage: React.FC<RouteComponentProps<MatchProps>> = ({
  match,
}) => {
  return (
    <>
      <NavContainer />
      <NoteContainer id={match.params.id} />
    </>
  );
};

export default NoteDetailPage;
