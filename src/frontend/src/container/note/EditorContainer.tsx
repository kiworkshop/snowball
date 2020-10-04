import React, { useState } from 'react';
import { addNote } from '../../lib/api/note';
import Editor from '../../component/note/Editor';

interface Props {
  date: string;
}

const EditorContainer: React.FC<Props> = ({ date }) => {
  const [value, setValue] = useState('');

  const onSave = async () => {
    const writtenData = {
      content: value,
      date,
    };

    const response = await addNote(writtenData);
    console.log(response);
  };

  return <Editor value={value} setValue={setValue} onSave={onSave} />;
};

export default EditorContainer;
