import React from "react";
// Tools

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

//ICONS
import RecommendIcon from "@mui/icons-material/Recommend";
import MenuIcon from "@mui/icons-material/Menu";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';


// FULL COMPONENTS
import Navbar from "./Navbar";
import "./App.scss";
import { useState } from "react";
import VideoComponent from "./VideoComponent";
import Peer from "peerjs"
import { useEffect } from "react";
import { useRef } from "react";



var connections  = []



function President() {

  
  //state
  const [questionText, setQuestionText] = useState("THE CURRENT QUESTION WILL APPEAR HERE");
  const [currentPeer, setCurrentPeer] = useState();
  const [connectionReference, setConnectionReference] = useState();
  const [connectionList, setConnectionList] = useState([]);
  const [ID, setID] = useState()
  const [HostingLink, setHostingLink] = useState('')
  const [data, setData] = useState('')
  const [recievedData, setRecievedData] = useState('')



  //ref
  const videoRef = useRef()

  useEffect(() => {
    getVideo();
  }, [videoRef]);


  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };



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
      setHostingLink(`localhost:3000/${id}`)
    });

    peer.on('connection', (conn) => { 
      connections.push(conn.peer)
  
  
      conn.on('open', function() {
        // Receive messages
        conn.on('data', function(data) {
          console.log('Received', data);
        });
        
        console.log("SENDING MESSAGE")
        // Send messages
  
      });
    });


    peer.on('call', function(call) {
      // Answer the call
      call.answer();

      call.on('stream', function(stream) {
        // `stream` is the MediaStream of the remote peer.
        // Here you'd add it to an HTML video/canvas element.
          showVideo(videoRef.current, stream)
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

 

  
  return (
    <>
      <Navbar />
      <div className="video-area">
        <div className="video-container">
          <video ref={videoRef} className='video'/>

        </div>
      </div>

      <div className="comment-area">
        <div className="question-box">
          <input
            placeholder="I have a question..."
            name="question"
            onChange={(e) => setQuestionText(e.target.value)}
            value={questionText}
            disabled
          ></input>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
            <button className="streaming button" onClick={sendData}>
                <VideoCameraFrontIcon style={{fontSize: '4rem'}}  />
            </button>
        </div>
        <div className="question-box">
            <input
                label="MY LINK"
                name="question"
                value={HostingLink}
                disabled
            ></input>
        </div>
      </div>
    </>
  );
}

export default President;
