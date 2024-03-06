'use client';
import React from 'react'
import {Note} from '../utils/storage.tsx'
import { useRouter } from 'next/navigation';

const NoteCard = (props: Note) => {
  const router = useRouter();

   return (
    <div key={props.id} className="card w-96 bg-base-100 shadow-xl max-w-full" onClick={(e)=>{
     router.push(`/notes/${props.id}`)
    }}>
        <div className="card-body">
          <div className="card-title">
            {props.header}
          </div>
          <p className="line-clamp-2 overflow-hidden"> {props.description}</p>
          <div className="card-actions justify-end">
            {
                props.tags.map((tag) => <div key={tag} className="badge badge-outline">{tag}</div>)
            }
          </div>
        </div>
    
    </div>
    
  )
}

export default NoteCard