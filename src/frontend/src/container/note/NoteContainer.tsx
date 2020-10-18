import React, { useEffect, useState } from 'react';
import { message, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import { deleteNote, getNote } from '../../lib/api/note';
import routes from '../../routes';

import Page404 from '../../pages/Page404';
import Note from '../../component/note/Note';

interface NoteContainerProps {
  id: string;
}

const NoteContainer: React.FC<NoteContainerProps> = ({ id }) => {
  const [note, setNote] = useState({
    id: '',
    text: '',
    investmentDate: '',
    createdDate: '',
    lastModifiedDate: '',
  });

  const history = useHistory();

  const onClickUpdateButton = () => {
    history.push(routes.note.update(id));
  };

  // 노트 삭제 관련 로직
  const onClickDeleteButton = () => {
    Modal.confirm({
      content: '정말 삭제하시겠습니까? 삭제한 이후엔 복구할 수 없습니다.',
      async onOk() {
        try {
          const response = await deleteNote(id);

          if (response.status === 200) {
            history.push(routes.home());
          } else if (response.status === 404) {
            return <Page404 />;
          } else {
            message.error('알 수 없는 오류가 발생했습니다.');
          }
        } catch (e) {
          console.log(e);
          message.error('알 수 없는 오류가 발생했습니다.');
        }
      },
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      icon: <></>,
    });
  };

  useEffect(() => {
    async function fetchNote() {
      try {
        const response = await getNote(id);

        if (response.status === 200) {
          setNote(response.data);
        } else if (response.status === 404) {
          return <Page404 />;
        } else {
          message.error('알 수 없는 오류가 발생했습니다.');
        }
      } catch (e) {
        console.log(e);
        message.error('알 수 없는 오류가 발생했습니다.');
      }
    }

    fetchNote();
  }, [id]);

  return (
    <Note
      note={note}
      onClickUpdateButton={onClickUpdateButton}
      onClickDeleteButton={onClickDeleteButton}
    />
  );
};

export default NoteContainer;
