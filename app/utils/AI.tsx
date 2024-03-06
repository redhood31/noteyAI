'use server'
import { revalidatePath } from 'next/cache';
import OpenAI from 'openai';
export interface Note{
    header : string,
    description : string,
    tags: string[],
    id: number
}
export const getAITags = async(note)=>{
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });
    
    const tags_string = 'Personal Diary Reflection Journal Work Project Meeting Task Deadline Study Lecture Homework Research Health Fitness Nutrition Mental_Health Wellness Travel Adventure Vacation Destination Book Reading Literature Tech Coding Programming Idea Creativity Innovation Goals Objectives Achievements Quotes Inspirational Motivational Movies TV_Shows Music Shopping Wishlist Finance Budgeting Expenses Food Recipes Cooking Social Friends Events Hobbies Sports Crafts Learning Knowledge';
    const possible_tags = tags_string.split(' ');
    const prompt = `I'm giving you these list of the words: Personal Diary Reflection Journal Work Project Meeting Task Deadline Study Lecture Homework Research Health Fitness Nutrition Mental_Health Wellness Travel Adventure Vacation Destination Book Reading Literature Tech Coding Programming Idea Creativity Innovation Goals Objectives Achievements Quotes Inspirational Motivational Movies TV_Shows Music Shopping Wishlist Finance Budgeting Expenses Food Recipes Cooking Social Friends Events Hobbies Sports Crafts Learning Knowledge

    Remember it.
    
    Now I will be giving you statements and you should find which tags are relevant to it. Alright?
    
    For example
    A: Need to talk with Mike about upcoming deadline
    B: Meeting, Work, Deadline
    
    A: Do some Errands when will be in a grocery store
    B: Personal, Shopping
    
    A: Read a book Think and Grow Rich
    B: Personal, Reading, Book, Motivational`

    let convo = [
        {role: 'system', content: prompt},
        {role: 'user', content: note.header+note.description}
    ];
    const completion = await openai.chat.completions.create({
        messages: convo,
        model: 'gpt-3.5-turbo'
    });
    const result = completion.choices[0].message.content;
    let tags = [];
    for(let tag of possible_tags){
        if(result.indexOf(tag) !== -1){
            tags.push(tag)
        }
    }
    return tags;
}
export const searchAI = async(key_word, notes)=>{
    try{
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });
    
  const prompt = `I'm giving you list of notes, each of them has (header, description, id, tags) parameters.
  Then I will provide you the search sentance, and you should output JSON array of ind parameters of those notes that are relevant to this search sentance.
  Give as JSON file array of ind parameters of these notes.
  `;
    const ask = `A: ${key_word}`;

    let convo = [
        {role: 'system', content: prompt},
        {role: 'system', content: notes},
        {role: 'user', content: ask}
    ];
    const completion = await openai.chat.completions.create({
        messages: convo,
        model: "gpt-3.5-turbo-0125",
        response_format : { "type": "json_object" }
    });
    const result = completion.choices[0].message.content;
    const resJson = JSON.parse(result);
    // console.log(' res is ' , result, ' ' , resJson[Object.keys(resJson)[0]])
    return resJson[Object.keys(resJson)[0]]
}catch(error){
    return []
}
}