import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store/modules';
import { setForm } from '../../store/modules/note';

import Editor from '../../component/write/Editor';

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

  const onChange = useCallback(
    (content: string) => dispatch(setForm({ content })),
    [dispatch]
  );

  const { form } = useSelector((state: RootState) => state.note);

  return (
    <Editor
      formData={form}
      onChange={onChange}
      onSave={onSave}
      loading={loading}
      error={error}
    />
  );
};

export default EditorContainer;
