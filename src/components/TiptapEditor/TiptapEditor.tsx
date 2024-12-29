import { Button } from 'react-bootstrap'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { ButtonGroup } from 'react-bootstrap'
import * as icons from 'react-bootstrap-icons'

import classes from './TiptapEditor.module.css'

export const TiptapEditor = ({
  content,
  onChange,
}: {
  content: string
  onChange: (html: string) => void
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: classes.editor,
      },
    },
  })

  console.log('_______', classes)

  return (
    <div className={classes.component}>
      <ButtonGroup className={classes.toolbar}>
        <Button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <icons.TypeH1 />
        </Button>
        <Button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <icons.TypeH2 />
        </Button>
        <Button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <icons.TypeH3 />
        </Button>
        <Button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          <icons.ListUl />
        </Button>
        <Button
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          <icons.ListOl />
        </Button>
        <Button onClick={() => editor?.chain().focus().toggleBold().run()}>
          <icons.TypeBold />
        </Button>
        <Button onClick={() => editor?.chain().focus().toggleItalic().run()}>
          <icons.TypeItalic />
        </Button>
      </ButtonGroup>
      <EditorContent editor={editor} />
    </div>
  )
}
