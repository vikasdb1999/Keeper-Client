import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./CreateArea";

import { MyContext } from "../MyContext";

function GetNotes() {
  const [notes,setNote] = useState(null);
  const {setStatus} = useContext(MyContext);

    useEffect(()=>
      {
        fetch('http://localhost:4000/getNotes',{
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          }
        }).then(response=>{
          if(response.status === 200)
          {
          response.json().then(data=>{
            setNote(data.notes);
          })
          setStatus(true);
        }
        else{
          if(response.status === 500)
          {
            window.location.href = "/";
          }
        }
        })
      }
    ,[setNote,setStatus]);
   function AddNote(note) {
    setNote((prevValue) => {
      return [...prevValue, note];
    });
  }



  async function deleteItem(id) {
    try {
      await fetch(`http://localhost:4000/delete/${id}`,{
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        }
      });
      setNote((prevNotes) => {
        return prevNotes.filter((note) => {
          return note._id !== id;
        });
      });
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }
  function editItem(noteId,title,content)
  {
    const editedNote= {
      _id: noteId,
      noteId,
      title,
      content
    };
    const updatedNotes = notes.map((note) =>
    note._id === noteId ? editedNote : note
  );
    setNote(updatedNotes);
    fetch(`http://localhost:4000/edit`,{
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(editedNote),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        }
      }).then(res=>{
        if(res.status === 200)
        {
          console.log("OK");
        }
      }).catch(err=>{
        console.log(err);
      })
  }

  
  
  return (
    <div>
      <div className="notes">
        <Header />
        <CreateArea  setNote={setNote} addNote={AddNote} />
        {notes?.length> 0  && notes.map((note) => {
          return <Note key={note?._id} editItem={editItem} deleteItem={deleteItem} noteId={note._id} title={note.title} content={note.content} />;
        })}
      </div>
    </div>
  );
}

export default GetNotes;
