import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/modules';
import { getNoteAsync } from '../store/modules/note';
import NoteDetailContainer from '../container/note/NoteDetailContainer';

interface MatchProps {
  id: string;
}

const NoteDetailPage: React.FC<RouteComponentProps<MatchProps>> = ({
  match,
}) => {
  const noteId = Number(match.params.id);

  const dispatch = useDispatch();
  const { note: noteEntity } = useSelector((state: RootState) => state.note);
  const note = noteEntity[noteId];

  useEffect(() => {
    if (!note) {
      dispatch(getNoteAsync.request(noteId));
    }
  }, [dispatch, note, noteId]);

  if (!note) {
    return null;
  }

  return <NoteDetailContainer id={Number(match.params.id)} note={note} />;
};

export default NoteDetailPage;
