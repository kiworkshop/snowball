import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import EditorContainer from '../container/note/EditorContainer';

interface MatchProps {
  date: string;
}

const CreateNote: React.FC<RouteComponentProps<MatchProps>> = ({ match }) => {
  return <EditorContainer date={match.params.date} />;
};

export default CreateNote;
