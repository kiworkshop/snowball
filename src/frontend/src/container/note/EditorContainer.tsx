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
      text: value,
      investmentDate: date,
    };

    const response = await addNote(writtenData);

    // 투자노트 상세 조회 페이지로 리다이렉트 되어야함
    console.log(response);
  };

  return (
    <Editor value={value} setValue={setValue} noteDate={date} onSave={onSave} />
  );
};

export default EditorContainer;
