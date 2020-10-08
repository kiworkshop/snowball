import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/modules';
import CreateNoteBanner from '../../component/note/CreateNoteBanner';

const CreateNoteBannerWrapperContainer = () => {
  const nickname = useSelector((state: RootState) => state.user.name);

  return <CreateNoteBanner nickname={nickname} />;
};

export default CreateNoteBannerWrapperContainer;
