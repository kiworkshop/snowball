import { useMutation } from 'react-query';
import axios from 'axios';
import { message } from 'antd';

const deleteNote = (id: number) => {
  return axios.delete(`/api/notes/${id}`);
};

export default () => {
  return useMutation((id: number) => deleteNote(id), {
    onSuccess: () => {
      message.info('성공적으로 삭제되었습니다.');
    },
  });
};
