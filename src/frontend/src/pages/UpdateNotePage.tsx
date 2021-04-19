import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { UPDATE_NOTE_TYPE } from '../constants/write';
import { useAppDispatch, useNoteAction, useNoteState } from '../hooks';
import WriteTemplate from '../container/write/WriteTemplate';

interface MatchProps {
  id: string;
}

const UpdateNotePage: React.FC<RouteComponentProps<MatchProps>> = ({ match }) => {
  const noteId = Number(match.params.id);

  const dispatch = useAppDispatch();
  const { note: noteEntity } = useNoteState();
  const note = noteEntity[noteId];
  const noteActions = useNoteAction();

  useEffect(() => {
    dispatch(noteActions.getNoteRequest(noteId));
  }, [dispatch, noteActions, noteId]);

  if (!note) {
    return null;
  }

  return <WriteTemplate type={UPDATE_NOTE_TYPE} note={note} />;
};

export default UpdateNotePage;
