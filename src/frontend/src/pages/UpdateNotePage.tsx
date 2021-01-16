import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import UpdateNoteTemplate from '../container/write/UpdateNoteTemplate';

interface MatchProps {
  id: string;
}

const UpdateNotePage: React.FC<RouteComponentProps<MatchProps>> = ({
  match,
}) => {
  return <UpdateNoteTemplate id={Number(match.params.id)} />;
};

export default UpdateNotePage;
