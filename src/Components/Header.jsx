import React, { useContext, useEffect } from 'react'
import WbIncandescentOutlinedIcon from '@mui/icons-material/WbIncandescentOutlined';
import { useState } from 'react';
import { MyContext } from '../MyContext';
function Header() {
  const [image,setImage] = useState("");
  const {userStatus,setStatus} = useContext(MyContext);
  function logOut()
  {
    
    fetch("http://localhost:4000/logout",{
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      }
    }).then(res=>{
      console.log(res);
      if(res.status === 200)
      {
        window.location.href = "/";
        setStatus(false);
      }
    })
  }
  async function getImage()
  {
    const response = await fetch("http://localhost:4000/userImage",{
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      }
    });
    const data = await response.json();
    setImage(data.image);
  }
  useEffect(()=>{
    getImage();
  },[]);
  return (
    <header>
        <h1>
        <WbIncandescentOutlinedIcon/>       
            Keeper App
        </h1>
        {image && <img className="userimage" src={image} alt=""/>}
        {userStatus && <button onClick={logOut} className='logout'>Logout</button> }
    </header>
  )
}

export default Header