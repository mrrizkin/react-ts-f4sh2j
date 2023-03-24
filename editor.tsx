import React, { useMemo, useRef, useEffect, useState } from 'react';
import { CUSTOM_OPERATORS } from './utilities';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// MathQuill dependency
import './jquery';
import '@edtr-io/mathquill/build/mathquill.js';
import '@edtr-io/mathquill/build/mathquill.css';

// mathquill4quill include
import mathquill4quill from 'mathquill4quill';
import 'mathquill4quill/mathquill4quill.css';

// KaTeX dependency
import katex from 'katex';
import 'katex/dist/katex.css';
(window as any).katex = katex;

export const Editor = ({ value, onValueChange }) => {
  const [isOpenImageDialog, setIsOpenImageDialog] = useState(false);
  const [url, setUrl] = useState('');
  const [range, setRange] = useState<any>(null);
  const quillRef = useRef(null);
  const modules = useMemo(
    () => ({
      formula: true,
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [
            {
              size: [
                '12px',
                '16px',
                '18px',
                '20px',
                '22px',
                '24px',
                '26px',
                '28px',
                '30px',
                '32px',
                '34px',
                '36px',
              ],
            },
          ],
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ align: [] }],
          ['formula'],
          ['clean'],
          [{ color: [] }],
        ],
      },
    }),
    []
  );

  useEffect(() => {
    var Size = Quill.import('attributors/style/size');
    Size.whitelist = [
      '12px',
      '16px',
      '18px',
      '20px',
      '22px',
      '24px',
      '26px',
      '28px',
      '30px',
      '32px',
      '34px',
      '36px',
    ];
    Quill.register(Size, true);
    const enableMathQuillFormulaAuthoring = mathquill4quill({ Quill, katex });
    enableMathQuillFormulaAuthoring(quillRef.current.editor, {
      displayHistory: false,
      operators: CUSTOM_OPERATORS,
      displayDeleteButtonOnHistory: true,
    });
    return () => {};
  }, []);

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={value}
      onChange={onValueChange}
      modules={modules}
      style={{ height: 160, marginBottom: 42 }}
    />
  );
};

export default Editor;
