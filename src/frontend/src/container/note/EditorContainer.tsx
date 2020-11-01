import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { RootState } from '../../store/modules';

import Editor from '../../component/note/Editor';
import { setFormThunk } from '../../store/modules/note';

interface EditorContainerProps {
  onSave: () => void;
  loading: boolean;
  error: Error | null;
}

const EditorContainer: React.FC<EditorContainerProps> = ({
  onSave,
  loading,
  error,
}) => {
  const dispatch = useDispatch();

  const setContent = useCallback(
    (content: string) => dispatch(setFormThunk({ content })),
    [dispatch]
  );

  const setInvestmentDate = useCallback(
    (investmentDate: moment.Moment | null) =>
      dispatch(setFormThunk({ investmentDate })),
    [dispatch]
  );

  const { form } = useSelector((state: RootState) => state.note);

  return (
    <Editor
      formData={form}
      setContent={setContent}
      onSave={onSave}
      loading={loading}
      error={error}
    />
  );
};

export default EditorContainer;
