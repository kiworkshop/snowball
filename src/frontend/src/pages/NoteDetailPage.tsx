import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import NoteDetailContainer from '../container/note/NoteDetailContainer';

interface MatchProps {
  id: string;
}

const NoteDetailPage: React.FC<RouteComponentProps<MatchProps>> = ({
  match,
}) => {
  return <NoteDetailContainer id={Number(match.params.id)} />;
};

export default NoteDetailPage;
