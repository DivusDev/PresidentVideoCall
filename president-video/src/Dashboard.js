import React from "react";
// Tools

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';


//ICONS
import RecommendIcon from "@mui/icons-material/Recommend";
import MenuIcon from "@mui/icons-material/Menu";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

// FULL COMPONENTS
import Navbar from "./Navbar";
import "./App.scss";
import { useState } from "react";
import VideoComponent from "./VideoComponent";
import Peer from "peerjs"
import { useEffect } from "react";
import { useRef } from "react";
import { Identity } from "@mui/base";
import { useParams } from "react-router-dom";



var connections  = []



function Dashboard() {

  
  //state
  const [questionText, setQuestionText] = useState("");
  const [currentPeer, setCurrentPeer] = useState();
  const [connectionReference, setConnectionReference] = useState();
  const [connectionList, setConnectionList] = useState([]);
  const [ID, setID] = useState()

  const [data, setData] = useState('')
  const [recievedData, setRecievedData] = useState('')


  //ref
  const videoref = useRef()

  //params
  let { connectionID } = useParams();



  //functions

  const showVideo = (video, stream) => {
    video.srcObject = stream
    video.onloadedmetadata = () => video.play();
  }

  useEffect(() => {

    var peer = new Peer();
    setCurrentPeer(peer)

    peer.on('open', function(id) {
      console.log('My peer ID is: ' + id);
      
      console.log("Trying to connect to", connectionID)
      var conn = peer.connect(connectionID);

    });

    peer.on('connection', (conn) => { 
      connections.push(conn.peer)
  
  
      conn.on('open', function() {
        // Receive messages
        conn.on('data', function(data) {
          console.log('Received', data);
        });
        
        console.log
        // Send messages
  
      });
    } );


    peer.on('call', function(call) {
      // Answer the call
      call.answer();

      call.on('stream', function(stream) {
        // `stream` is the MediaStream of the remote peer.
        // Here you'd add it to an HTML video/canvas element.
          showVideo(videoref.current, stream)
        });
    });



  }, [])


  const sendData = async () => {
    console.log(connections)
    //    navigator.getUserMedia( { video: true, audio: true }, (mediaStream) => {

    const mediaStream = await navigator.mediaDevices.getDisplayMedia( { video: true, audio: true })
    
      connections.forEach( peerid => {
          currentPeer.call(peerid, mediaStream)
      })
      
  }

 


  const createConnection = () => {
    var conn = currentPeer.connect(connectionID);
    console.log(connectionID)
    console.log("adding connection ")
    connectionList.push(conn.peer)
  }
  

  const sendQuestion = () => {
    console.log(`Someone asked ${questionText}`);
  };

  const sendFeedback = (liked) => {
    console.log(`Someone ${liked ? "Liked" : "Hated"} Joe's recent Comment`);
  };

  return (
    <>
      <Navbar />
      <div className="video-area">
        <div className="video-container">
          <video ref={videoref} className='video'/>
          {/* <VideoComponent /> */}
        </div>
      </div>

      <div className="comment-area">
        <div className="profile-info">
          <div className="left">
            <div className="profile-picture" />
            <span className="profile-name">Ryan Renolds</span>
          </div>
          <div className="middle">
            <div className="speaking-picture" />
            <span className="speaker-name">Joe Biden</span>
          </div>
          <div className="right">
            <span className="user-id">User ID: 123532123</span>

            <RecommendIcon
              className="thumbs up"
              onClick={() => sendFeedback(true)}
            />
            <RecommendIcon
              className="thumbs down"
              onClick={() => sendFeedback(false)}
            />
          </div>
        </div>
        <div className="question-box">
          <input
            placeholder="I have a question..."
            name="question"
            onChange={(e) => setQuestionText(e.target.value)}
            value={questionText}
          ></input>
          <button className="question-button" onClick={sendQuestion}>
            <QuestionMarkIcon />
          </button>
        </div>
        <div>
          
        <button className="question-button" onClick={() => {}}>
            Create Peer
          </button>
          <button className="question-button" onClick={() => createConnection()}>
            Connect to other Peer
          </button>
          <input onChange={(e) => setData(e.target.value)} placeholder='Data to send' />
          <button className="question-button" onClick={sendData}>
            Send data
          </button>
          <span>RECEIVED DATA: {recievedData}</span>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
