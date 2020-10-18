import React, { useState } from 'react';
import moment from 'moment';
import { message } from 'antd';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/modules';
import { addNote, updateNote } from '../../lib/api/note';
import routes from '../../routes';

import Editor from '../../component/note/Editor';

interface EditorContainerProps {
  date: string;
  initialValue?: string;
  id?: string;
}

const EditorContainer: React.FC<EditorContainerProps> = ({
  date,
  initialValue = '',
  id,
}) => {
  const [value, setValue] = useState(initialValue);

  const history = useHistory();

  const user = useSelector((state: RootState) => state.user.userInfo);

  const onSave = async () => {
    try {
      const writtenData = {
        text: value,
        investmentDate: moment(date).format('YYYY-MM-DD'),
        user,
      };

      let response;

      if (id) {
        response = await updateNote(id, writtenData);
      } else {
        response = await addNote(writtenData);
      }

      if (response.status === 200) {
        const { id: noteId } = response.data;
        history.push(routes.note.detail(noteId));
      } else {
        message.error('알 수 없는 오류가 발생했습니다.');
      }
    } catch (e) {
      console.log(e);
      message.error('알 수 없는 오류가 발생했습니다.');
    }
  };

  return (
    <Editor value={value} setValue={setValue} noteDate={date} onSave={onSave} />
  );
};

export default EditorContainer;
