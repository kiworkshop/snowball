import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import routes from '../../routes';

import NoteList from '../../component/note/NoteList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/modules';
import { getNotesOfUserThunk } from '../../store/modules/user';

const NoteListContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    notes,
    loading: { getNotesOfUser: loading },
    error: { getNotesOfUser: error },
  } = useSelector((state: RootState) => state.user);

  const getNotesOfUser = useCallback(
    () => dispatch(getNotesOfUserThunk(1, 1)),
    [dispatch]
  );

  const onClickMoreInfoButton = (noteId: string) => {
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
