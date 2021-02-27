import React, { useCallback, useEffect } from 'react';
import { Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import * as history from '../../lib/history';
import routes from '../../routes';
import noteSlice from '../../features/note';
import { noteSelector } from '../../lib/selector';
import NoteDetail from '../../component/note/NoteDetail';

interface NoteContainerProps {
  id: number;
}

const NoteDetailContainer: React.FC<NoteContainerProps> = ({ id }) => {
  /**
   * redux store
   */
  const dispatch = useAppDispatch();
  const { note, loading, error } = useAppSelector(noteSelector);
  const noteActions = noteSlice.actions;

  /**
   * functions
   */
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
