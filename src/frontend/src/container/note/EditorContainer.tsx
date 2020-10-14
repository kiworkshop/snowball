import React, { useState } from 'react';
import moment from 'moment';
import { message } from 'antd';
import { addNote } from '../../lib/api/note';

import Editor from '../../component/note/Editor';

interface EditorContainerProps {
  date: string;
}

const EditorContainer: React.FC<EditorContainerProps> = ({ date }) => {
  const [value, setValue] = useState('');

  const onSave = async () => {
    try {
      const writtenData = {
        text: value,
        investmentDate: moment(date).format('YYYY-MM-DD'),
      };

      const response = await addNote(writtenData);

      if (response.status === 200) {
        // 투자노트 상세 조회 페이지로 리다이렉트 되어야함
        console.log(response);
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
