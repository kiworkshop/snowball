import React, { useState } from 'react';
import NoteList from '../../component/note/NoteList';

const notesDummy = [
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos provident repudiandae, architecto doloremque sunt suscipit asperiores accusamus optio fuga quam perspiciatis vero illum illo nemo consectetur dignissimos tempora reiciendis soluta?',
    date: '20201001',
  },
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos provident repudiandae, architecto doloremque sunt suscipit asperiores accusamus optio fuga quam perspiciatis vero illum illo nemo consectetur dignissimos tempora reiciendis soluta?',
    date: '20201002',
  },
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos provident repudiandae, architecto doloremque sunt suscipit asperiores accusamus optio fuga quam perspiciatis vero illum illo nemo consectetur dignissimos tempora reiciendis soluta?',
    date: '20201003',
  },
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos provident repudiandae, architecto doloremque sunt suscipit asperiores accusamus optio fuga quam perspiciatis vero illum illo nemo consectetur dignissimos tempora reiciendis soluta?',
    date: '20201004',
  },
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos provident repudiandae, architecto doloremque sunt suscipit asperiores accusamus optio fuga quam perspiciatis vero illum illo nemo consectetur dignissimos tempora reiciendis soluta?',
    date: '20201005',
  },
];

const NoteListContainer = () => {
  const [selected, setSelected] = useState('');

  const onClickNote = (date: string) => {
    if (selected === date) {
      setSelected('');
    } else {
      setSelected(date);
    }
  };

  return (
    <NoteList
      notes={notesDummy}
      selected={selected}
      onClickNote={onClickNote}
    />
  );
};

export default NoteListContainer;
