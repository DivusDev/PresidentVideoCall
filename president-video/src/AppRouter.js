
import React from 'react';

// import { Routes, Route, useNavigate, Router } from "react-router";
import { BrowserRouter, Routes, Route, useNavigate, Router } from 'react-router-dom'
import PeerJs from 'peerjs';
import { useRef } from 'react';
import Dashboard from './Dashboard';
import President from './President';



const App = () => {
    return (
      <BrowserRouter>
        <Routes>
            {/* <Route exact path="/" element={<NameInput />} />
            <Route exact path="/overview" element={<Overview />} />
            <Route exact path="/call" element={<Call />} /> */}
            <Route exact path="/:connectionID" element={<Dashboard />} />
            <Route exact path="/president" element={<President />} />

        </Routes>
      </BrowserRouter>
    );
  };
  

export default App