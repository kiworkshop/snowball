import React, { useCallback, useEffect } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Note from '../../component/note/Note';
import { getNoteThunk } from '../../store/modules/note';
import { RootState } from '../../store/modules';
// import Page404 from '../../pages/Page404';

interface NoteContainerProps {
  id: string;
}

const NoteContainer: React.FC<NoteContainerProps> = ({ id }) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const {
    note,
    loading: { getNote: loading },
    error: { getNote: error },
  } = useSelector((state: RootState) => state.note);

  const onClickUpdateButton = () => history.push(`/note/${id}`);
  const onClickDeleteButton = () =>
    Modal.confirm({
      content: <p>정말 삭제하시겠습니까?</p>,
      onOk() {
        console.log('deleted');
      },
      okType: 'danger',
    });

  const getNote = useCallback(() => {
    dispatch(getNoteThunk(id));
  }, [dispatch, id]);

  useEffect(() => {
    getNote();
  }, [getNote, id]);

  return (
    <Note
      note={note}
      onClickUpdateButton={onClickUpdateButton}
      onClickDeleteButton={onClickDeleteButton}
      loading={loading}
      error={error}
    />
  );
};

export default NoteContainer;
