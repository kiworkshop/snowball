import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Layout } from 'antd';
import styled from 'styled-components';

import { RootState } from '../store/modules';
import routes from '../routes';

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
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  if (!isLoggedIn) {
    return <Redirect to={routes.login()} />;
  }

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
