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
import ScreenShareIcon from '@mui/icons-material/ScreenShare';


// FULL COMPONENTS
import Navbar from "./Navbar";
import "./App.scss";
import { useState } from "react";
import VideoComponent from "./VideoComponent";
import Peer from "peerjs"
import { useEffect } from "react";
import { useRef } from "react";
import { ThumbDown } from "@mui/icons-material";
import { ThumbUp } from "@mui/icons-material";



// var connections  = []




function President() {

  
  //state

  const [currentPeer, setCurrentPeer] = useState();
  const [connectionReference, setConnectionReference] = useState();
  const [connections, setConnections] = useState([]);
  const [ID, setID] = useState()
  const [HostingLink, setHostingLink] = useState('')
  const [data, setData] = useState('')
  const [recievedData, setRecievedData] = useState('')
  const [waitingRoom, setWaitingRoom] = useState(0)

  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [questionObj, setQuestionObj] = useState({});
  const [questionIndex, setQuestionIndex] = useState(-1);



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
      setHostingLink(id)
    });

    peer.on('connection', (conn) => { 
      setConnections(c => c.concat(conn.peer))

      console.log('connection made!')
  
      // someone connected to the stream
      // add to the waiting room
      setWaitingRoom(w => w + 1)

      conn.on('open', function() {
        // Receive messages
        conn.on('data', function(dataPackage) {
          console.log('Message!', dataPackage)
          const {type, data, id} = dataPackage
          if (type == 'like') {
            setLikes(clikes => clikes + 1)
          } else if (type == 'dislike') {
            setDislikes(cdislikes => cdislikes + 1)
          } else if (type == 'question') {
            setQuestionObj( qObj =>({...qObj, [id]: data}))
          }

        });
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


  const sendWebCam = async () => {
    console.log(connections)
    const mediaStream = await navigator.mediaDevices.getUserMedia( { video: true, audio: true })

    // const mediaStream = await navigator.mediaDevices.getDisplayMedia( { video: true, audio: true })
    showVideo(videoRef.current, mediaStream)

      connections.forEach( peerid => {
          currentPeer.call(peerid, mediaStream)
      })

      //empty out waiting room
      setWaitingRoom(w => 0)
      
  }

  const shareScreen = async () => {
    console.log(connections)

    const mediaStream = await navigator.mediaDevices.getDisplayMedia( { video: true, audio: true })
    showVideo(videoRef.current, mediaStream)

      connections.forEach( peerid => {
          currentPeer.call(peerid, mediaStream)
      })

      //empty out waiting room
      setWaitingRoom(w => 0)
      
  }

  const getQuestion = () => {
    const questions = Object.keys(questionObj).length
    if (questions == 0) return
    const randomQuestionIndex = Math.floor(Math.random() * questions)
    setQuestionIndex(randomQuestionIndex)

    
  }

 

  
  return (
    <>
      <Navbar />
      <div className="video-area">
        <div className="video-container">
          <video ref={videoRef} className='video president'/>
        </div>
      </div>

      <div className="comment-area">
        <div className="information">
          <div>
            WAITING ROOM SIZE: {waitingRoom}
          </div>
          <div>
            Likes : {likes} <ThumbUp  style={{color: 'green', marginLeft:'2rem'}} />
          </div>
          <div>
            Dislikes : {dislikes} <ThumbDown  style={{color: 'red', marginLeft:'2rem'}} />
          </div>
        </div>
        <div className="question-box">
          <input
            placeholder="I have a question..."
            name="question"
            value={questionIndex == -1 ? 'There have been no questions...' : Object.values(questionObj)[questionIndex]}
            disabled
          ></input>
          <button className="question button" onClick={getQuestion}>
            <QuestionMarkIcon />
          </button>
          
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
        <button className="streaming button" onClick={sendWebCam}>
                <VideoCameraFrontIcon style={{fontSize: '4rem'}}  />
            </button>
            <button className="streaming button" onClick={shareScreen}>
                <ScreenShareIcon style={{fontSize: '4rem'}}  />
            </button>
        </div>
        <div className="question-box">
            <input
                label="MY LINK"
                name="question"
                value={`localhost:3000/${HostingLink}`}
                disabled
            ></input>
           
        </div>
        <div className="question-box">
            <input
                label="MY LINK"
                name="question"
                value={`https://president.loca.lt/${HostingLink}`}
                disabled
            ></input>
           
        </div>
      </div>
    </>
  );
}

export default President;
