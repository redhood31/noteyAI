'use client';
import React, { useEffect, useState } from 'react'
import {Note, saveNote, getNote, removeNote} from '../utils/storage'
import Link from 'next/link.js';
import { useRouter } from 'next/navigation';
const NoteEditing = ({id, href} : any) => {
    const [textValue, setTextValue] = useState('');
    const [header,  setHeader] = useState('');
    const [tags, setTages] = useState([]);
    const [waiting , setWaiting] = useState(false);
    const router = useRouter();
    useEffect(()=>{
        if(id !== 'new' && isNaN(Number(id)) == false){
            let current_note = getNote(Number(id));
            setHeader(current_note.header)
            setTextValue(current_note.description)
            setTages(current_note.tags)
        }
    } , [])
    const handleChange = (event) => {
        setTextValue(event.target.value);
    };
    const handleHeadline = (event) => {
        setHeader(event.target.value);
    }
    const saveTheNote = ()=>{
        const newNote : Note = {
            header: header,
            description: textValue,
            id: Number(id),
            tags: []
        }
        setWaiting(true);
        saveNote(newNote).then(response=>{
            router.push('/')
        })
    };
    const removeTheNote = ()=>{
        setWaiting(true);
        removeNote(Number(id));
        router.push('/')
    };
  
   return (
   <>
   
    
    <div className="relative flex flex-col bg-white items-center h-screen w-[97%] mx-auto border rounded-md text-lg focus:outline-none focus:border-blue-500" style={{maxWidth: '900px'}}>
    <div className="flex w-full">
        <button className="btn btn-square btn-error ml-3 mt-3"
                onClick={(e)=>{
                    router.push('/')
                }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button> 

        <input 
        type="text" 
        placeholder="Type your header" 
        className="w-[90%] px-0 mx-5 mt-5  border-b-2 border-solid border-gray-500 focus:outline-none lg:text-3xl md:text-2xl sm:text-xl" 
        onChange={handleHeadline}
        value={header}
        />
      </div>
      
      <div className="relative border-2 border-solid border-gray-200 w-full flex-grow w-95 rounded-t-none">
      {(waiting == true ? <div className="absolute bg-opacity-5 top-0 z-50 w-full h-full bg-gray-800 flex items-center justify-center"> <span className="loading loading-ring loading-lg text-primary absolute z-60">Loading</span> </div>: <></>)}
    
        <textarea 
        className="textarea w-full h-full focus:outline-none !important lg:text-2xl md:text-xl sm:text-lg" 
        placeholder="Your note goes here..." 
        value={textValue}
        onChange={handleChange}
        />
        <div className="absolute bottom-3 right-0">
            {
                tags.map((tag) => <div key={tag} className="badge badge-outline lg:text-2xl md:text-xl sm:text-lg p-5 m-1">{tag}</div>)
            }
        </div>
     </div>
      
      <div className="flex gap-3 mb-10">
        <button 
            className="btn btn-primary max-w-32 mt-2" 
            onClick={(e)=>{
                saveTheNote();
            }}
        >
            Save
        </button>
        <button 
            className="btn btn-error max-w-32 mt-2 mb-2" 
            onClick={(e)=>{
                removeTheNote();
            }}
        >
            Remove
        </button>
      </div>
    </div>
    
    </>
  )
}

export default NoteEditing;
