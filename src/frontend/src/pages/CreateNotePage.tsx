import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import NavContainer from '../container/base/NavContainer';
import CreateNoteTemplate from '../container/write/CreateNoteTemplate';
import Container from '../component/base/Container';

const CreateNotePageContentContainer = styled(Container)`
  padding: 30px 0;

  @media (max-width: 575px) {
    padding: 30px 20px;
  }
`;


const CreateNotePage = () => {
  return (
    <Layout style={{ minHeight: '100%', paddingTop: '64px' }}>
      <NavContainer selectedMenu={['createNote']} />
      <CreateNotePageContentContainer>
        <CreateNoteTemplate />
      </CreateNotePageContentContainer>
    </Layout>
  );
};

export default CreateNotePage;
