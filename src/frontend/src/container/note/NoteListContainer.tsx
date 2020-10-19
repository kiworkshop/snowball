import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { useHistory } from 'react-router-dom';
import { getNotes } from '../../lib/api/note';
import routes from '../../routes';

import { NoteType } from '../../type/note';

import NoteList from '../../component/note/NoteList';

const NoteListContainer = () => {
  const [notes, setNotes] = useState<Array<NoteType.Note>>([]);

  const history = useHistory();
  const onClick = (id: string) => {
    history.push(routes.note.detail(id));
  };

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await getNotes(1);

        if (response.status === 200) {
          setNotes([...response.data]);
        } else {
          message.error('알 수 없는 오류가 발생했습니다.');
        }
      } catch (e) {
        message.error('알 수 없는 오류가 발생했습니다.');
      }
    }

    fetchNotes();
  }, []);

  return <NoteList notes={notes} onClick={onClick} />;
};

export default NoteListContainer;
