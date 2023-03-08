'use client';
import { useRouter } from 'next/navigation';
//use client transforme le component en client component
import React from 'react'
import {FormEvent} from "react"

export default function NewBoardForm() {

  const router = useRouter()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const title = formData.get("title")

    fetch('/api/boards', {
      method: "POST",
      body: JSON.stringify({
        title 
      })
    })
      .then(res => res.json())
      .then((data) => {
        router.refresh();
      })
  }

  return (
    <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap4'>
            
        </form>
    </div>
  )
}
