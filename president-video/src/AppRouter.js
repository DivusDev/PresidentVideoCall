
import React from 'react';

// import { Routes, Route, useNavigate, Router } from "react-router";
import { BrowserRouter, Routes, Route, useNavigate, Router } from 'react-router-dom'
import PeerJs from 'peerjs';
import { useRef } from 'react';
import Dashboard from './Dashboard';
import President from './President';


const Help = () => {
  return (
    <div style={{padding: '40px'}}>
      <h1>You need a special link to access the president! Try again with the Right link 😉</h1>
      <hr></hr>
      <h3>Directions!</h3>
      <p>There is at most 1 president and as many people tuning into his stream as you want.</p>
      <ol>
        <li>The president goes to president.loca.lt/president</li>
        <li>He then copies the correct link with the associated ID (found at the bottom of the page) and gives it to the people joining him, for example president.loca.lt/171283-1231a87-21038912</li>
        <li>Those who want to join into the podcast must follow his link, then enter the waiting room by clicking the button</li>
        <li>The president may watch his waiting room fill up with people.</li>
        <li>When hes ready, he may click the video icon to start live streaming to everyone, or the screen icon to screenshare to everyone</li>
        <li>People may ask questions and like or dislike the presidents comments</li>
        <li>The president may pull a random question from all of the asked questions by clicking the <strong>?</strong></li>
        <li>MAGE AI is protecting the president from any unwanted AD's or Offensive Questions!</li>
      </ol>
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