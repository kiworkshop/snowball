import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import NoteDetailContainer from '../container/note/NoteDetailContainer';

interface MatchProps {
  id: string;
}

const NoteDetailPage: React.FC<RouteComponentProps<MatchProps>> = ({
  match,
}) => {
  const noteId = Number(match.params.id);
  return <NoteDetailContainer id={noteId} />;
};

export default NoteDetailPage;
