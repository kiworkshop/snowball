import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/modules';
import { getNoteAsync } from '../store/modules/note';
import UpdateNoteTemplateContainer from '../container/write/UpdateNoteTemplateContainer';

interface MatchProps {
  id: string;
}

const UpdateNotePage: React.FC<RouteComponentProps<MatchProps>> = ({
  match,
}) => {
  const id = Number(match.params.id);
  const noteEntity = useSelector((state: RootState) => state.note.note);
  const note = noteEntity[id];

  const dispatch = useDispatch();

  useEffect(() => {
    if (!note) {
      dispatch(getNoteAsync.request(id));
    }
  }, [dispatch, note, id]);

  if (!note) {
    return null;
  }

  return (
    <UpdateNoteTemplateContainer id={Number(match.params.id)} note={note} />
  );
};

export default UpdateNotePage;
