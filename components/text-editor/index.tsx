'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

interface TextEditorProps {
  onChange?: (value: string) => void;
  value: string;
  previewOnly?: boolean;
}

const TextEditor = ({ onChange, value, previewOnly }: TextEditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  return previewOnly ? (
    <ReactQuill theme='bubble' value={value} readOnly />
  ) : (
    <div className='bg-background'>
      <ReactQuill theme='snow' value={value} onChange={onChange} />
    </div>
  );
};

export default TextEditor;
