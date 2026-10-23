"use client";
import React from 'react'
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from '@tiptap/extension-highlight';
import MenuBar from './menu-bar';

interface CustomTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

function CustomTextEditor({ content, onChange }: CustomTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    content: content,
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3"
          }
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-3"
          }
        },
      }),

      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),

      Highlight.configure({
      }),
    ],
    editorProps: {
      attributes: {
        class: "mt-2 py-2 px-5 rounded-xl w-full max-w-[600px] min-h-[500px] hover:border-slate-400 border-2 shadow-md"
      }
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  })

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default CustomTextEditor;
