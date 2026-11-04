import './AppEditor.scss'
import type { AppEditorPropInterface } from '../../types/AppEditorTypes'
import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export const AppEditor = ({ content, setContent }: AppEditorPropInterface) => {
    const editor = useEditor({
        content: content,
        extensions: [
            StarterKit
        ],
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            setContent(html)
        },
    })
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content)
        }
    }, [content])
  return (
    <>
      <EditorContent editor={editor}/>
    </>
  )
}