import classes from './AppEditor.module.scss'
import type { AppEditorPropInterface } from './AppEditorTypes'
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
    <div className={classes.editorWrapper}>
      <div className={classes.editorButtons}>
      <button onClick={() => editor.chain().focus().toggleBold().run()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M272-200v-560h221q65 0 120 40t55 111q0 51-23 78.5T602-491q25 11 55.5 41t30.5 90q0 89-65 124.5T501-200zm121-112h104q48 0 58.5-24.5T566-372t-10.5-35.5T494-432H393zm0-228h93q33 0 48-17t15-38q0-24-17-39t-44-15h-95z"/></svg>
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M231.54-230v-44.62h145.38l139.23-410.76H370.77V-730h332.31v44.62H562.31L423.08-274.62h140.77V-230z"/></svg>
        </button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M486-184.62q-65.23 0-115-35t-74.23-96.07l40.31-17.23q19.38 45.69 56.57 75.15 37.2 29.46 92.81 29.46 51.23 0 96-26.92T627.23-340q0-27.23-7.38-45.31-7.39-18.07-21.7-34.69h52q9.62 12.46 15.2 32.73 5.57 20.27 5.57 47.27 0 74.46-55.34 114.92-55.35 40.46-129.58 40.46M100-500v-40h760v40zm382-278.31q53.69 0 92.04 22.89 38.34 22.88 65.34 70.65l-39.53 18.23q-15.16-27.46-44.27-47.77-29.12-20.31-73.12-20.31-61.77 0-96.46 34.27T356.77-620h-43.69q-6.46-61.31 40.65-109.81 47.12-48.5 128.27-48.5"/></svg>
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M501.85-561.38 464.23-599l31.54-76.15H386.54l-49.46-49.47h427.54v49.24H550.31zm271.69 431.53L454.62-449.54l-92.31 217.23h-54.08l109-254.61-295.08-294.31 28.31-28.31 651.39 651.39z"/></svg>
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M154-251v-457h126v165h114v-165h126v457H394v-166H280v166zm526 0v-331h-80v-126h206v457z"/></svg>
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M100.78-263.61v-432.78h106V-533H334v-163.39h106v432.78H334V-427H206.78v163.39zm419.22 0V-427q0-44.3 30.85-75.15T626-533h127.22v-57.39H520v-106h233.22q44.3 0 75.15 30.85 30.85 30.84 30.85 75.15V-533q0 44.3-30.85 75.15T753.22-427H626v57.39h233.22v106z"/></svg>
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M111.87-273.07v-413.86h91v161.43H349v-161.43h91v413.86h-91V-434.5H202.87v161.43zm408.13 0v-91h237.13v-70.43H600v-91h157.13v-70.43H520v-91h237.13q37.78 0 64.39 26.6 26.61 26.61 26.61 64.4v231.86q0 37.79-26.61 64.4-26.61 26.6-64.39 26.6z"/></svg>
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M120-280v-400h80v160h160v-160h80v400h-80v-160H200v160zm600 0v-120H520v-280h80v200h120v-200h80v200h80v80h-80v120z"/></svg>
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M140-290v-380h60v160h180v-160h60v380h-60v-160H200v160zm380 0v-60h227.69q5.39 0 8.85-3.46t3.46-8.85v-75.38q0-5.39-3.46-8.85t-8.85-3.46H520v-220h300v60H580v100h167.69q29.83 0 51.07 21.24T820-437.69v75.38q0 29.83-21.24 51.07T747.69-290z"/></svg>
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M160-300v-360h40v160h200v-160h40v360h-40v-160H200v160zm424.62 0q-26.66 0-45.64-18.98T520-364.62v-230.76q0-26.66 18.98-45.64T584.62-660H800v40H584.62q-10.77 0-17.7 6.92-6.92 6.93-6.92 17.7V-500h175.38q26.66 0 45.64 18.98T800-435.38v70.76q0 26.66-18.98 45.64T735.38-300zM560-460v95.38q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92h150.76q10.77 0 17.7-6.92 6.92-6.93 6.92-17.7v-70.76q0-10.77-6.92-17.7-6.93-6.92-17.7-6.92z"/></svg>
        </button>
        <button onClick={() => editor.chain().focus().setParagraph().run()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M413.85-203.08V-440h-7.7q-66.84 0-113.42-46.58-46.58-46.57-46.58-113.42t46.58-113.42Q339.31-760 406.15-760h256.93v40h-80v516.92h-40V-720h-89.23v516.92z"/></svg>
        </button>
        <button onClick={() => editor.chain().focus().toggleTaskList().run()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m424-339.69 255.85-255.85-28.31-28.31L424-396.31l-114-114L281.69-482 424-339.69ZM224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h510.76q27.62 0 46.12 18.5Q800-763 800-735.38v510.76q0 27.62-18.5 46.12Q763-160 735.38-160H224.62Zm0-40h510.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-510.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69H224.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v510.76q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69ZM200-760v560-560Z"/></svg>
        </button>
      </div>
        <EditorContent className={classes.editorContent} editor={editor}/>
    </div>
  )
}