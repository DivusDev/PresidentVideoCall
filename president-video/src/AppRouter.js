
import React from 'react';

// import { Routes, Route, useNavigate, Router } from "react-router";
import { BrowserRouter, Routes, Route, useNavigate, Router } from 'react-router-dom'
import PeerJs from 'peerjs';
import { useRef } from 'react';
import Dashboard from './Dashboard';
import President from './President';


const Help = () => {
  return (
    <div>
      <h1>You need a special link to access the president! Try again with the Right link 😉</h1>
    </div>
  )
}




const App = () => {
    return (
      <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Help />} />
            <Route exact path="/:presidentID" element={<Dashboard />} />
            <Route exact path="/president" element={<President />} />

        </Routes>
      </BrowserRouter>
    );
  };
  

export default App