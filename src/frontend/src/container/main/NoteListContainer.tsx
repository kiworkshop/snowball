import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useNoteAction, useNoteState } from '../../hooks';
import history from '../../lib/history';
import routes from '../../routes';
import NoteList from '../../component/main/NoteList';

const NoteListContainer = () => {
  const dispatch = useAppDispatch();
  const { notes, loading } = useNoteState();
  const noteAction = useNoteAction();

  const onClickUpdateNoteButton = useCallback(
    (noteId: number) => () => {
      history.push(routes.note.update(noteId));
    },
    []
  );

  const onClickDeleteNoteButton = useCallback(
    (noteId: number) => () => {
      if (window.confirm('정말 삭제하시겠습니까?')) {
        dispatch(noteAction.deleteNoteFromListRequest(noteId));
      }
    },
    [dispatch, noteAction]
  );

  const onChangePage = useCallback(
    (page: number) => {
      dispatch(noteAction.setPage(page));
    },
    [dispatch, noteAction]
  );

  useEffect(() => {
    dispatch(noteAction.getNotesRequest({ page: notes.currentPage, size: notes.pageSize }));
    return () => {
      dispatch(noteAction.initializeNoteList());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NoteList
      loading={loading.getNotes}
      notes={notes.content}
      page={notes.currentPage}
      pageSize={notes.pageSize}
      totalPages={notes.totalPages}
      onChangePage={onChangePage}
      onClickUpdateNoteButton={onClickUpdateNoteButton}
      onClickDeleteNoteButton={onClickDeleteNoteButton}
    />
  );
};

export default NoteListContainer;
