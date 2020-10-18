import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import routes from '../../routes';

const StyledButton = styled(Button)`
  bottom: 30px;
  position: fixed;
  right: 30px;
`;

const CreateNoteButton = () => {
  const history = useHistory();

  const onClick = () => {
    history.push(routes.note.create(moment(Date.now()).format('YYYYMMDD')));
  };

  return (
    <StyledButton size="large" onClick={onClick}>
      투자노트 작성
    </StyledButton>
  );
};

export default CreateNoteButton;
