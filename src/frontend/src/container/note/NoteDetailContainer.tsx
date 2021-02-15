import React, { useCallback } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../../routes';
import { RootState } from '../../store/modules';
import { deleteNoteAsync } from '../../store/modules/note';
import * as history from '../../lib/history';
import { Note } from '../../types/state/note';
import NoteDetail from '../../component/note/NoteDetail';

interface NoteContainerProps {
  id: number;
  note: Note;
}

const NoteDetailContainer: React.FC<NoteContainerProps> = ({ id, note }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.note);

  const deleteNote = useCallback(
    (id: number) => dispatch(deleteNoteAsync.request(id)),
    [dispatch]
  );

  const onClickUpdateButton = useCallback(
    (id: number) => () => history.push(routes.note.update(id)),
    []
  );

  const onClickDeleteButton = useCallback(
    (id: number) => () =>
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

  return (
    <NoteDetail
      note={note}
      onClickUpdateButton={onClickUpdateButton(id)}
      onClickDeleteButton={onClickDeleteButton(id)}
      loading={loading.getNote}
      error={error.getNote}
    />
  );
};

export default NoteDetailContainer;
