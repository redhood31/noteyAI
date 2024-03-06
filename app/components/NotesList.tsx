'use client';
import React, { useEffect, useState } from 'react'
import {getNotesList, Note} from '../utils/storage'
import NoteCard from './NoteCard';
const NotesList = (props) => {
   
   return (
    props.Notes ? 
    <div className="max-h-full p-8 overflow-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-0">
        {
            props.Notes.map((note : Note) => <NoteCard key={note.id} {...note} />)
        }
    </div> : <></>
  )
}

export default NotesList