import React from 'react';
import { CREATE_NOTE_TYPE } from '../constants/write';
import WriteTemplate from '../container/write/WriteTemplate';

const CreateNotePage = () => {
  return <WriteTemplate type={CREATE_NOTE_TYPE} />;
};

export default CreateNotePage;
