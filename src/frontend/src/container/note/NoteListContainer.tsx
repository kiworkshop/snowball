import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useNoteAction, useNoteState } from '../../hooks';
import history from '../../lib/history';
import routes from '../../routes';
import NoteList from '../../component/note/NoteList';

const NoteListContainer = () => {
  const dispatch = useAppDispatch();
  const { notes } = useNoteState();
  const noteActions = useNoteAction();

  const getMyNotes = useCallback(() => {
    dispatch(noteActions.getNotesRequest({ page: 0, size: 10 }));
  }, [dispatch, noteActions]);

  const onClickMoreInfoButton = useCallback((noteId: number) => {
    history.push(routes.note.detail(noteId));
  }, []);

  useEffect(() => {
    getMyNotes();
  }, [getMyNotes]);

  return <NoteList notes={notes} onClickMoreInfoButton={onClickMoreInfoButton} />;
};

export default NoteListContainer;
