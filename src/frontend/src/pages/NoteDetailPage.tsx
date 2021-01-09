import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Layout } from 'antd';
import styled from 'styled-components';
import NavContainer from '../container/base/NavContainer';
import NoteDetailContainer from '../container/note/NoteDetailContainer';
import Container from '../component/base/Container';

interface MatchProps {
  id: string;
}

const NoteDetailPageContentContainer = styled(Container)`
  padding: 30px 0;

  @media (max-width: 767px) {
    padding: 30px 20px;
  }
`;

const NoteDetailPage: React.FC<RouteComponentProps<MatchProps>> = ({
  match,
}) => {
  return (
    <Layout style={{ minHeight: '100%', paddingTop: '64px' }}>
      <NavContainer />
      <NoteDetailPageContentContainer>
        <NoteDetailContainer id={Number(match.params.id)} />
      </NoteDetailPageContentContainer>
    </Layout>
  );
};

export default NoteDetailPage;
