import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Layout } from 'antd';

import NavContainer from '../container/base/NavContainer';
import NoteContainer from '../container/note/NoteContainer';

interface MatchProps {
  id: string;
}

const NoteDetailPage: React.FC<RouteComponentProps<MatchProps>> = ({
  match,
}) => {
  return (
    <Layout style={{ background: '#fff', height: '100%', paddingTop: '64px' }}>
      <NavContainer />
      <NoteContainer id={Number(match.params.id)} />
    </Layout>
  );
};

export default NoteDetailPage;
