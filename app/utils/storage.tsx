'use client';
import React from "react"
import { getAITags , searchAI} from "./AI.tsx";
import { revalidatePath } from "next/cache.js";
import { useRouter } from "next/navigation.js";

export interface Note{
    header : string,
    description : string,
    tags: string[],
    id: number
}

export const getNotesList = ()=>{
    try{
        let notesList = null;
        let datainStorage = localStorage.getItem("notes")
        if(datainStorage != null){
            notesList = JSON.parse(datainStorage);
        }else{
            notesList = []
        }
        return notesList;
    }catch(error){
        return [];
    }
}
export const removeNote = (note_id : number)=>{
    let notesList = getNotesList();
    notesList = notesList.filter((obj : Note) => obj.id !== note_id)
    localStorage.setItem("notes", JSON.stringify(notesList));
}
export const getNote = (note_id : number)=>{
    let notesList = getNotesList();
    let found_note = notesList.filter((obj : Note) => obj.id == note_id)
    if(found_note.length == 1){
        return found_note[0]
    }else{
        return null;
    }
}



export const saveNote = async(note : Note)=>{
    let notesList = getNotesList();
    let found = false;
    let max_id = 0;
    let ind = 0;
    note.tags = await getAITags(note);
    for(let note_item of notesList){
        max_id = Math.max(max_id, note_item.id)
        if(note_item.id == note.id){
            notesList[ind] = note;
            found = true;
        }
        ind += 1;
    }
    if(found == false){
        note.id = max_id + 1;   
        notesList.push(note);
    }
    localStorage.setItem("notes", JSON.stringify(notesList));
}
export const searchNotes = async(query : String)=>{
    if(query.toLowerCase().indexOf('tag:') == 0){
        let looking_for = query.toLocaleLowerCase().slice(4)
        let notes = getNotesList()
        notes = notes.filter((note) => {
            let ok = false;
            for(let tag of note.tags){
                if(tag.toLowerCase() == looking_for){
                    ok = true;
                }
            }
            return ok;
        })
        return notes
    }else{
        let notes = getNotesList()
        let notes_string = JSON.stringify(notes)
        let relevant_inds = await searchAI(query, notes_string);
        let res = notes.filter((obj) => {
            return relevant_inds.includes(obj.id)
        })
        return res;
    }
}