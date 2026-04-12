'use client';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react';

export default function TiptapEditor({ content, onChange }: { content: string, onChange: (str: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[200px] p-4 text-gray-700 editor-content',
      },
    },
  })

  // To allow external content updates (like Gemini Generate) to reflect in editor
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden flex-1 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-shadow">
      <div className="bg-gray-50 border-b border-gray-200 p-2 flex gap-1 flex-wrap">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`px-2 py-1 rounded text-sm font-bold ${editor.isActive('bold') ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-200 text-gray-600'}`}>B</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`px-2 py-1 rounded text-sm italic font-serif ${editor.isActive('italic') ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-200 text-gray-600'}`}>I</button>
        <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`px-2 py-1 rounded text-sm font-bold ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-200 text-gray-600'}`}>H2</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`px-2 py-1 rounded text-sm font-bold ${editor.isActive('heading', { level: 3 }) ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-200 text-gray-600'}`}>H3</button>
        <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`px-2 py-1 rounded text-sm font-medium ${editor.isActive('bulletList') ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-200 text-gray-600'}`}>• List</button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`px-2 py-1 rounded text-sm font-medium ${editor.isActive('orderedList') ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-200 text-gray-600'}`}>1. List</button>
      </div>
      <EditorContent editor={editor} />
      <style jsx global>{`
        .editor-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
        .editor-content ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
        .editor-content h2 { font-size: 1.5rem; font-weight: bold; margin-bottom: 0.75rem; color: #1f2937; }
        .editor-content h3 { font-size: 1.25rem; font-weight: bold; margin-bottom: 0.5rem; color: #374151; }
        .editor-content p { margin-bottom: 0.75rem; }
      `}</style>
    </div>
  )
}
