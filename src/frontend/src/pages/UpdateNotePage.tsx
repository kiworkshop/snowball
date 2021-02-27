import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import noteSlice from '../features/note';
import { noteSelector } from '../lib/selector';
import UpdateNoteTemplateContainer from '../container/write/UpdateNoteTemplateContainer';

interface MatchProps {
  id: string;
}

const UpdateNotePage: React.FC<RouteComponentProps<MatchProps>> = ({ match }) => {
  const noteId = Number(match.params.id);

  /**
   * redux store
   */
  const dispatch = useAppDispatch();
  const { note: noteEntity } = useAppSelector(noteSelector);
  const note = noteEntity[noteId];
  const noteActions = noteSlice.actions;

  useEffect(() => {
    if (!note) {
      dispatch(noteActions.getNoteRequest(noteId));
    }
  }, [dispatch, noteActions, note, noteId]);

  if (!note) {
    return null;
  }

  return <UpdateNoteTemplateContainer id={noteId} note={note} />;
};

export default UpdateNotePage;
