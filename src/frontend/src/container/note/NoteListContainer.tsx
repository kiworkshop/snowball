import React, { useEffect, useState } from 'react';
import { getNotes } from '../../lib/api/note';

import NoteList from '../../component/note/NoteList';

interface Note {
  id: string;
  text: string;
  investmentDate: string;
  createdDate: string;
  lastModifiedDate: string;
}

const notesDummy = [
  {
    id: '1',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos provident repudiandae, architecto doloremque sunt suscipit asperiores accusamus optio fuga quam perspiciatis vero illum illo nemo consectetur dignissimos tempora reiciendis soluta?',
    investmentDate: '20201001',
    createdDate: '20201001',
    lastModifiedDate: '20201001',
  },
  {
    id: '2',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos provident repudiandae, architecto doloremque sunt suscipit asperiores accusamus optio fuga quam perspiciatis vero illum illo nemo consectetur dignissimos tempora reiciendis soluta?',
    investmentDate: '20201002',
    createdDate: '20201002',
    lastModifiedDate: '20201002',
  },
  {
    id: '3',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos provident repudiandae, architecto doloremque sunt suscipit asperiores accusamus optio fuga quam perspiciatis vero illum illo nemo consectetur dignissimos tempora reiciendis soluta?',
    investmentDate: '20201003',
    createdDate: '20201003',
    lastModifiedDate: '20201003',
  },
  {
    id: '4',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos provident repudiandae, architecto doloremque sunt suscipit asperiores accusamus optio fuga quam perspiciatis vero illum illo nemo consectetur dignissimos tempora reiciendis soluta?',
    investmentDate: '20201004',
    createdDate: '20201004',
    lastModifiedDate: '20201004',
  },
  {
    id: '5',
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos provident repudiandae, architecto doloremque sunt suscipit asperiores accusamus optio fuga quam perspiciatis vero illum illo nemo consectetur dignissimos tempora reiciendis soluta?',
    investmentDate: '20201005',
    createdDate: '20201005',
    lastModifiedDate: '20201005',
  },
];

const NoteListContainer = () => {
  const [selected, setSelected] = useState('');
  const [notes, setNotes] = useState<Array<Note>>([]);

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
        setNotes([...notesDummy]);
      }
    }

    fetchNotes();
  }, []);

  return (
    <NoteList notes={notes} selected={selected} onClickNote={onClickNote} />
  );
};

export default NoteListContainer;
