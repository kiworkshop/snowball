import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Layout } from 'antd';
import styled from 'styled-components';
import Container from '../component/base/Container';
import NavContainer from '../container/base/NavContainer';
import UpdateNoteTemplate from '../container/write/UpdateNoteTemplate';

interface MatchProps {
  id: string;
}

const UpdateNotePageContentContainer = styled(Container)`
  padding: 30px 0;

  @media (max-width: 767px) {
    padding: 30px 20px;
  }
`;

const UpdateNotePage: React.FC<RouteComponentProps<MatchProps>> = ({
  match,
}) => {
  return (
    <Layout style={{ minHeight: '100%', paddingTop: '64px' }}>
      <NavContainer />
      <UpdateNotePageContentContainer>
        <UpdateNoteTemplate id={Number(match.params.id)} />
      </UpdateNotePageContentContainer>
    </Layout>
  );
};

export default UpdateNotePage;
