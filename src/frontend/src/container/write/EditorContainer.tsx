import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/modules';
import { setForm } from '../../store/modules/note';
import Editor from '../../component/write/Editor';

interface EditorContainerProps {
  onSave: () => void;
  loading: boolean;
}


const EditorContainer: React.FC<EditorContainerProps> = ({
  onSave,
  loading,
}) => {
  const dispatch = useDispatch();
  const { form } = useSelector((state: RootState) => state.note);

  const onChange = useCallback(
    (content: string) => dispatch(setForm({ content })),
    [dispatch]
  );

  return (
    <Editor
      formData={form}
      onChange={onChange}
      onSave={onSave}
      loading={loading}
    />
  );
};

export default EditorContainer;
