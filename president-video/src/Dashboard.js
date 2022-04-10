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
import { useParams, useNavigate  } from "react-router-dom";


//MAGE API
import  { runModel } from './TestMage'


var connections  = []
var likes = 0;
var dislikes = 0


function Dashboard() {

  
  //state
  const [questionText, setQuestionText] = useState("");
  const [currentPeer, setCurrentPeer] = useState();
  const [connectionReference, setConnectionReference] = useState();
  const [connectionList, setConnectionList] = useState([]);
  const [ID, setID] = useState()
  const [streamPlaying, setStreamPlaying] = useState(false)

  const [data, setData] = useState('')
  const [recievedData, setRecievedData] = useState('')

  const [entered, setEntered] = useState(false)


  //ref
  const videoref = useRef()

  //params
  let { presidentID } = useParams();

  //navigation
  let navigator = useNavigate()


  //functions

  const showVideo = (video, stream) => {
    video.srcObject = stream
    video.onloadedmetadata = () => video.play();
    setStreamPlaying(true)
  }

  useEffect(() => {

    var peer = new Peer();
    setCurrentPeer(peer)

    peer.on('open', async (id) => {
      console.log('My peer ID is: ' + id);
      
      var conn = peer.connect(presidentID);
      setConnectionReference(conn)
    });

    peer.on('error', () => {
      //something went wrong send them to home
      
      // navigator('/')
    })

    peer.on('connection', (conn) => { 
      connections.push(conn.peer)
  
  
      conn.on('open', function() {
        // Receive messages
        conn.on('data', function(data) {
          console.log('Received', data);
        });
        
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



  const sendQuestion = async (e) => {
    e.preventDefault()


        //test question with ML to see if it is spam or offensive and therefore NOT WORTHY


    const IsOffensiveResponse = await runModel('offensive', questionText)

    if (!IsOffensiveResponse || IsOffensiveResponse[0].prediction ) {
      console.log('OFFENSIVE QUESTION DETECTED, QUESTION NOT ASKED')
      setQuestionText( q => '')

      return;
    }


    const SpamTestResponse = await runModel('spam', questionText)

    if (SpamTestResponse[0].prediction == 'spam') {
      console.log('SPAM DETECTED, QUESTION NOT ASKED')
      setQuestionText( q => '')

      return;
    }

   
    


    const dataPackage = {
      type: 'question',
      id: currentPeer.id,
      data: questionText
    }
    connectionReference.send(dataPackage)
    setQuestionText( q => '')

  };

  const sendFeedback = (liked) => {
    const dataPackage = {
      type: liked ? 'like' : 'dislike',
      id: currentPeer.peer
    }
    connectionReference.send(dataPackage)
  };



  return (
    <><div className={`enter-screen ${entered ? 'hide' : ''}`}>
        <button onClick={() => setEntered(true)}>
          Click me to enter the waiting room
        </button>
      </div> 
      <Navbar />
      <div className="video-area">
        <div className="video-container">
          {!streamPlaying ? 
          <div className='waiting-room'>
          You are in the Waiting Room
          </div>
          : <></>
}
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
        <form onSubmit={sendQuestion}>

        <div className="question-box">
          <input
            placeholder="I have a question..."
            name="question"
            onChange={(e) => setQuestionText(e.target.value)}
            value={questionText}
          ></input>
          <button type='submit' className="question button">
            <QuestionMarkIcon />
          </button>
         
        </div>
        </form>

        <div>
          
        </div>
      </div>
    </>
  );
}

export default Dashboard;
