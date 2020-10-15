import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { getNote } from '../../lib/api/note';

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

  useEffect(() => {
    async function fetchNote() {
      try {
        const response = await getNote(id);

        if (response.status === 200) {
          setNote(response.data);
        } else if (response.status === 404) {
          return <Page404 />;
        } else {
          message.info('알 수 없는 오류가 발생했습니다.');
        }
      } catch (e) {
        console.log(e);
        message.info('알 수 없는 오류가 발생했습니다.');
      }
    }

    fetchNote();
  });

  return <Note note={note} />;
};

export default NoteContainer;
