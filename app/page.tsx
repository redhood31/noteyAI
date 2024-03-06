'use client';
import Image from "next/image";
import NotesList from './components/NotesList'
import NoteEditing from './components/NoteEditing'
import Notes from './components/NotesList'
import { useRouter } from 'next/navigation';
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import {getNotesList, searchNotes} from './utils/storage'


export default function Home() {
  const router = useRouter();
  const [Notes, setNotes] = useState([])
  const inputRef = useRef();
  useEffect(()=>{
        setNotes(getNotesList());
  } , [])
  
   
  return (
    <main className="flex h-screen flex-col items-center p-5 py-10">

      <div className="mb-10 text-10 lg:text-3xl md:text-2xl sm:text-xl">
        Notey app
      </div>
      <div className="w-[90%] flex" style={{maxWidth: '700px'}}>
      <label className="input w-[90%] input-bordered flex items-center gap-2">
        <input ref={inputRef} type="text" className="grow" placeholder="Search, tag:work" />

        
        
      </label>
      <button className="btn btn-square btn-primary ml-2 max-w-[10%]"
            onClick={async (e)=>{
              if(inputRef.current.value == ''){
                setNotes(getNotesList());
              }else{
                setNotes(await searchNotes(inputRef.current.value))
              }
            }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
        </button> 
      </div>

      <NotesList Notes={Notes}/>

      <div className="flex-grow">
      
     </div>
      <button className='btn btn-primary mt-10' onClick={(e)=>{
        router.push('/notes/new')
      }}>
        Create new note
      </button>

    </main>
  );
}
