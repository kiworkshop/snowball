import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import routes from '../../routes';
import { RootState } from '../../store/modules';
import { getNotesAsync } from '../../store/modules/note';

import NoteList from '../../component/note/NoteList';

const NoteListContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    notes,
    loading: { getNotes: loading },
    error: { getNotes: error },
  } = useSelector((state: RootState) => state.note);

  const getNotesOfUser = useCallback(
    () => dispatch(getNotesAsync.request({ page: 1, size: 1 })),
    [dispatch]
  );

  const onClickMoreInfoButton = (noteId: number) => {
    return () => history.push(routes.note.detail(noteId));
  };

  useEffect(() => {
    getNotesOfUser();
  }, [getNotesOfUser]);

  return (
    <NoteList
      notes={notes}
      onClickMoreInfoButton={onClickMoreInfoButton}
      loading={loading}
      error={error}
    />
  );
};

export default NoteListContainer;
