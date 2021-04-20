import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useAppDispatch, useNoteAction, useNoteState, useWriteAction } from '../hooks';
import { UPDATE_NOTE_TYPE } from '../constants/write';
import EditorContainer from '../container/editor/EditorContainer';

interface MatchProps {
  id: string;
}

const UpdateNotePage: React.FC<RouteComponentProps<MatchProps>> = ({ match }) => {
  const noteId = Number(match.params.id);

  const dispatch = useAppDispatch();
  const { note: noteEntity } = useNoteState();
  const note = noteEntity[noteId];
  const noteAction = useNoteAction();
  const writeAction = useWriteAction();

  useEffect(() => {
    dispatch(writeAction.initialize());
    dispatch(noteAction.getNoteRequest(noteId));
  }, [dispatch, writeAction, noteAction, noteId]);

  if (!note) {
    return null;
  }

  return <EditorContainer type={UPDATE_NOTE_TYPE} />;
};

export default UpdateNotePage;
