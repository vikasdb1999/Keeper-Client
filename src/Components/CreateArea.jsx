import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import {useNavigate } from "react-router-dom";
function CreateArea(props) { 
  const navigate = useNavigate();
    const [note,setNotes] = useState({
      title: '',
      content: ''
    });
    
    const [isClicked,setIsClicked] = useState(false);


    function handleSubmit(e)
    {
        e.preventDefault();  
    const requestOptions = {
      method: 'POST',
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({note})
  }; 
  fetch('http://localhost:4000', requestOptions).then(res=>{
    if(res.status === 200)
    {
    setNotes({
      title: '',
      content: ''
    }); 
    setIsClicked(false);
    res.json().then(data=>{
      props.setNote(data);
    })
    }
    else if(res.status === 500)
    {
      navigate("/");
    }
  });
}
  function changeVal(e)
  {
    const {name,value} = e.target;
    setNotes((prevValue)=>{
      return {
        ...prevValue,
        [name]:value
      }
    });
  }
  return (
    <div>
      <form onSubmit={handleSubmit} >
        {isClicked 
        && 
        <input 
        name="title" 
        onChange={changeVal} 
        placeholder="Title"  
        value={note.title}  
        autoFocus
        />}
        <textarea 
        name="content" 
        onClick={()=>{setIsClicked(true)}} 
        onChange={changeVal} value ={note.content} 
        placeholder="Take a note..." 
        rows={isClicked?"3":"1"} 
        />    
        <button type="submit"  >
          <AddIcon />
        </button>
      </form>
    </div>
  );
}

export default CreateArea;