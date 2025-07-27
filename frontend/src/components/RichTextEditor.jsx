import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

import './editor.css';

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex gap-2 mb-2 flex-wrap">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'bg-gray-300 px-2 rounded' : 'px-2'}
      >
        <b>B</b>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'bg-gray-300 px-2 rounded' : 'px-2'}
      >
        <i>I</i>
      </button>
     
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className="px-2"
      >
        ↺ Undo
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className="px-2"
      >
        ↻ Redo
      </button>
    </div>
  );
};

const RichTextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write the announcement here...',
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // 🔁 Update editor content if `value` changes externally (e.g., when editing an announcement)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '<p></p>');
    }
  }, [value, editor]);

  return (
    <div className="border border-gray-300 rounded p-3">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="min-h-[150px]" />
    </div>
  );
};

export default RichTextEditor;
