import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useNoteAction, useNoteState } from '../../hooks';
import history from '../../lib/history';
import routes from '../../routes';
import NoteList from '../../component/main/NoteList';

const NoteListContainer = () => {
  const [page, setPage] = useState(1);

  const dispatch = useAppDispatch();
  const { notes, loading, totalPages } = useNoteState();
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
        dispatch(noteAction.deleteNoteRequest(noteId));
      }
    },
    [dispatch, noteAction]
  );

  const onChangePage = useCallback((page: number) => {
    setPage(page);
  }, []);

  useEffect(() => {
    dispatch(noteAction.getNotesRequest({ page: page - 1, size: 10 }));
  }, [dispatch, noteAction, page]);

  return (
    <NoteList
      loading={loading.getNotes}
      notes={notes}
      page={page}
      totalPages={totalPages}
      onChangePage={onChangePage}
      onClickUpdateNoteButton={onClickUpdateNoteButton}
      onClickDeleteNoteButton={onClickDeleteNoteButton}
    />
  );
};

export default NoteListContainer;
