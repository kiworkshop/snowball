import React, { useState } from 'react';
import moment from 'moment';
import { message } from 'antd';
import { useHistory } from 'react-router-dom';
import { addNote } from '../../lib/api/note';
import routes from '../../routes';

import Editor from '../../component/note/Editor';

interface EditorContainerProps {
  date: string;
}

const EditorContainer: React.FC<EditorContainerProps> = ({ date }) => {
  const [value, setValue] = useState('');

  const history = useHistory();

  const onSave = async () => {
    try {
      const writtenData = {
        text: value,
        investmentDate: moment(date).format('YYYY-MM-DD'),
      };

      const response = await addNote(writtenData);

      if (response.status === 200) {
        const { id: noteId } = response.data;
        history.push(routes.note.read(noteId));
      } else {
        message.info('알 수 없는 오류가 발생했습니다.');
      }
    } catch (e) {
      console.log(e);
      message.info('알 수 없는 오류가 발생했습니다.');
    }
  };

  return (
    <Editor value={value} setValue={setValue} noteDate={date} onSave={onSave} />
  );
};

export default EditorContainer;
