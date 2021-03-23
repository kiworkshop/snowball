import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import history from '../../lib/history';
import routes from '../../routes';
import noteSlice from '../../features/note';
import { noteSelector } from '../../lib/selector';
import NoteList from '../../component/note/NoteList';

const NoteListContainer = () => {
  /**
   * redux store
   */
  const dispatch = useAppDispatch();
  const { notes } = useAppSelector(noteSelector);
  const noteActions = noteSlice.actions;

  /**
   * functions
   */
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
