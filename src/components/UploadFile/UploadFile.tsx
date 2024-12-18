'use client'

import { useState, useRef } from 'react'
import { type PutBlobResult } from '@vercel/blob'
import { upload } from '@vercel/blob/client'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from 'next/image'

export default function UploadFile() {
  const [blob, setBlob] = useState<PutBlobResult | null>(null)
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!fileInputRef.current?.files) {
      throw new Error('No file selected')
    }

    const file = fileInputRef.current.files[0]

    const newBlob = await upload(fileName, file, {
      access: 'public',
      handleUploadUrl: '/api/upload',
    })

    setBlob(newBlob)
  }

  return (
    <>
      <h1>Upload Your Avatar</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>File</Form.Label>
          <Form.Control
            type="file"
            ref={fileInputRef}
            required
            onChange={() => {
              setFileName(fileInputRef.current?.files?.[0]?.name || '')
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>File name</Form.Label>
          <Form.Control
            type="text"
            value={fileName}
            onChange={(e) => {
              setFileName(e.target.value)
            }}
          />
        </Form.Group>
        <Form.Group>
          <Button type="submit" disabled={!fileInputRef.current?.files}>
            Upload
          </Button>
        </Form.Group>
      </Form>
      {blob && (
        <Image src={blob.url} alt="Uploaded file" width={194} height={140} />
      )}
    </>
  )
}
