import React from 'react';
import Editor from '../../component/write/Editor';

interface EditorContainerProps {
  form: { title: string; content: string; investmentDate: string };
  onChange: (content: string) => void;
  onSave: () => void;
  loading: boolean;
}

const EditorContainer: React.FC<EditorContainerProps> = ({ form, onChange, onSave, loading }) => {
  return <Editor content={form.content} onChange={onChange} onSave={onSave} loading={loading} />;
};

export default EditorContainer;
