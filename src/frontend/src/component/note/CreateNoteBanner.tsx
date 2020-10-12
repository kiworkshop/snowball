import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { FaUserCircle } from 'react-icons/fa';

interface Props {
  nickname: string;
}

const CreateNoteBannerWrapper = styled(Link)`
  align-items: center;
  border: 1px solid #333;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  padding: 20px;
  transition: 0.3s;
  width: 100%;

  &:hover {
    border: 1px solid #1890ff;

    svg,
    h1 {
      color: #1890ff;
    }
  }
`;

const UserIcon = styled(FaUserCircle)`
  color: #333;
  height: 40px;
  margin-right: 8px;
  transition: 0.3s;
  width: 40px;
`;

const BannerMessage = styled.h1`
  margin-bottom: 0;
  transition: 0.3s;
`;

const CreateNoteBanner: React.FC<Props> = ({ nickname }) => {
  return (
    <CreateNoteBannerWrapper
      to={`/create/note/${moment(Date.now()).format('YYYYMMDD')}`}
    >
      <UserIcon />
      <BannerMessage>
        {nickname}님, 오늘의 투자노트를 작성해보세요!
      </BannerMessage>
    </CreateNoteBannerWrapper>
  );
};

export default CreateNoteBanner;
