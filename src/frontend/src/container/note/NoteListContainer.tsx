import React, { useEffect, useState } from 'react';
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
