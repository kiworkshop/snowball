import React, { useState } from 'react';
import Editor from '../../component/note/Editor';

const EditorContainer = () => {
  const [value, setValue] = useState('');

  return <Editor value={value} setValue={setValue} />;
};

export default EditorContainer;
