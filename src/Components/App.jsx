import React, { useState } from "react";
import GetNotes from "./GetNotes";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../Pages/Login";
import {MyContext} from '../MyContext';
function App() {

  const [userStatus,setStatus] = useState(false);
    return (
      <div>
      <MyContext.Provider value={{userStatus,setStatus}} >     
       <BrowserRouter>
       <Routes>
       <Route index element={<Login />} />
       <Route path="app" element={<GetNotes />} />
       </Routes>
      </BrowserRouter>
      </MyContext.Provider>

      </div>
    )
}

export default App;
