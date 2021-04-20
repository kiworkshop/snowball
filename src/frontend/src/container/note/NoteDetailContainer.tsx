import React, { useCallback, useEffect } from 'react';
import { Modal } from 'antd';
import history from '../../lib/history';
import routes from '../../routes';
import NoteDetail from '../../component/note/NoteDetail';
import { useAppDispatch, useNoteAction, useNoteState } from '../../hooks';

interface NoteContainerProps {
  id: number;
}

const NoteDetailContainer: React.FC<NoteContainerProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { note, loading, error } = useNoteState();
  const noteActions = useNoteAction();

  const deleteNote = useCallback(
    (id: number) => {
      dispatch(noteActions.deleteNoteRequest(id));
    },
    [dispatch, noteActions]
  );

  const onClickUpdateButton = useCallback((id: number) => {
    history.push(routes.note.update(id));
  }, []);

  const onClickDeleteButton = useCallback(
    (id: number) =>
      Modal.confirm({
        content: <p>정말 삭제하시겠습니까?</p>,
        onOk() {
          deleteNote(id);
        },
        okType: 'danger',
        okText: '삭제',
        okButtonProps: { disabled: loading.deleteNote },
        cancelText: '취소',
        autoFocusButton: 'cancel',
      }),
    [deleteNote, loading.deleteNote]
  );

  // 노트 캐싱
  useEffect(() => {
    if (!note[id]) {
      dispatch(noteActions.getNoteRequest(id));
    }
  }, [dispatch, noteActions, note, id]);

  if (!note[id]) {
    return null;
  }

  return (
    <NoteDetail
      note={note[id]}
      onClickUpdateButton={() => onClickUpdateButton(id)}
      onClickDeleteButton={() => onClickDeleteButton(id)}
      loading={loading.getNote}
      error={error.getNote}
    />
  );
};

export default NoteDetailContainer;
