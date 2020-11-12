import React, { useCallback, useEffect } from 'react';
import { message, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteNoteThunk, getNoteThunk } from '../../store/modules/note';
import { RootState } from '../../store/modules';
import routes from '../../routes';

import Note from '../../component/note/Note';

interface NoteContainerProps {
  id: string;
}

const NoteContainer: React.FC<NoteContainerProps> = ({ id }) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const { note, loading, error } = useSelector(
    (state: RootState) => state.note
  );

  const onClickUpdateButton = () => history.push(routes.note.update(id));
  const deleteNote = useCallback(() => dispatch(deleteNoteThunk(id)), [
    dispatch,
    id,
  ]);
  const onClickDeleteButton = () =>
    Modal.confirm({
      content: <p>정말 삭제하시겠습니까?</p>,
      onOk() {
        deleteNote();
      },
      okType: 'danger',
      okText: '삭제',
      okButtonProps: { disabled: loading.deleteNote },
      cancelText: '취소',
      autoFocusButton: 'cancel',
    });

  const getNote = useCallback(() => {
    dispatch(getNoteThunk(id));
  }, [dispatch, id]);

  useEffect(() => {
    getNote();
  }, [getNote, id]);

  return (
    <>
      {error.deleteNote && message.error('삭제하는 동안 오류가 발생했습니다.')}

      <Note
        note={note}
        onClickUpdateButton={onClickUpdateButton}
        onClickDeleteButton={onClickDeleteButton}
        loading={loading.getNote}
        error={error.getNote}
      />
    </>
  );
};

export default NoteContainer;
