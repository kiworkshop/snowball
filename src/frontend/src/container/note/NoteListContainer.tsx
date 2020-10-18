import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { getNotes } from '../../lib/api/note';
import dummyData from '../../static/dummyData';

import { NoteType } from '../../type/note';

import NoteList from '../../component/note/NoteList';

const NoteListContainer = () => {
  const [selected, setSelected] = useState('');
  const [notes, setNotes] = useState<Array<NoteType.Note>>([]);

  const onClickNote = (id: string) => {
    if (selected === id) {
      setSelected('');
    } else {
      setSelected(id);
    }
  };

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await getNotes(1);

        if (response.status === 200) {
          setNotes(response.data);
        } else {
          message.info('알 수 없는 오류가 발생했습니다.');
        }
      } catch (e) {
        if (e.message === 'Network Error') {
          setNotes([...dummyData]);
          console.log(e);
        } else {
          message.info('알 수 없는 오류가 발생했습니다.');
        }

      const fetchedNotes = await getNotes(1);

      if (fetchedNotes) {
        setNotes(fetchedNotes);
      } else {
        setNotes([...dummyData]);
      }
    }

    fetchNotes();
  }, []);

  return (
    <NoteList notes={notes} selected={selected} onClickNote={onClickNote} />
  );
};

export default NoteListContainer;
