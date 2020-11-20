import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Layout } from 'antd';

import NavContainer from '../container/base/NavContainer';
import NoteContainer from '../container/note/NoteContainer';
import Container from '../component/base/Container';

interface MatchProps {
  id: string;
}

const NoteDetailPage: React.FC<RouteComponentProps<MatchProps>> = ({
  match,
}) => {
  return (
    <Layout style={{ minHeight: '100%', paddingTop: '64px' }}>
      <NavContainer />
      <Container style={{ padding: '30px 0' }}>
        <NoteContainer id={Number(match.params.id)} />
      </Container>
    </Layout>
  );
};

export default NoteDetailPage;
