import React, { useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedContent, setEditedContent] = useState(props.content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    props.editItem(props.noteId, editedTitle, editedContent);
    setIsEditing(false);
  };

  return (
    <div className='note'>
      {isEditing ? (
        <div>
          <input className='textArea'
            type='text'
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            autoFocus
          />
          <textarea 
            className='textArea'
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={handleSaveClick}><AddBoxIcon /></button>
        </div>
      ) : (
        <div>
          <h1>{props.title}</h1>
          <p>{props.content}</p>
          <button onClick={handleEditClick}><EditIcon/></button>
          <button onClick={() => props.deleteItem(props.noteId)}>
            <DeleteOutlineIcon />
          </button>
        </div>
      )}
    </div>
  );
}

export default Note;
