import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';
import { RootState } from '../store/modules';
import routes from '../routes';

import CreateNoteButton from '../component/base/CreateNoteButton';
import NavContainer from '../container/base/NavContainer';
import CreateNoteBannerContainer from '../container/note/CreateNoteBannerContainer';
import NoteListContainer from '../container/note/NoteListContainer';

const MainPage = () => {
  const logged = useSelector((state: RootState) => state.user.logged);

  const { Content } = Layout;

  return (
    <Layout style={{ background: '#fff' }}>
      <NavContainer />
      <Content>
        <CreateNoteBannerContainer />
        <NoteListContainer />
        <CreateNoteButton />
      </Content>
      {!logged && <Redirect to={routes.login()} />}
    </Layout>
  );
};

export default MainPage;
