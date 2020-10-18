import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { RootState } from '../store/modules';
import { getNote } from '../lib/api/note';
import routes from '../routes';

import Page404 from './Page404';
import NavContainer from '../container/base/NavContainer';
import EditorContainer from '../container/note/EditorContainer';

interface MatchProps {
  id: string;
}

const UpdateNote: React.FC<RouteComponentProps<MatchProps>> = ({ match }) => {
  const { id } = match.params;

  const [note, setNote] = useState({
    id: '',
    text: '',
    investmentDate: '',
    createdDate: '',
    lastModifiedDate: '',
  });

  const logged = useSelector((state: RootState) => state.user.logged);

  useEffect(() => {
    async function fetchNote() {
      try {
        const response = await getNote(id);

        if (response.status === 200) {
          setNote(response.data);
        } else if (response.status === 404) {
          return <Page404 />;
        } else {
          message.error('알 수 없는 오류가 발생했습니다.');
        }
      } catch (e) {
        console.log(e);
        message.error('알 수 없는 오류가 발생했습니다.');
      }
    }

    fetchNote();
  }, [id]);

  return (
    <>
      <NavContainer />
      <EditorContainer date={note.investmentDate} initialValue={note.text} />
      {!logged && <Redirect to={routes.login()} />}
    </>
  );
};

export default UpdateNote;
