'use client';
import React, { useEffect, useState } from 'react'
import {Note, saveNote, getNote} from '../../utils/storage'
import Link from 'next/link.js';
import NoteEditing from '../../components/NoteEditing';
const NewPage = ({params} : any) => {
    
  
   return (
    <Link href={`/notes/${params.id}`} passHref legacyBehavior >
            <NoteEditing id={params.id} />

    </Link>
  )
}

export default NewPage;
