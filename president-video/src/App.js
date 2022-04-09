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

// FULL COMPONENTS
import Navbar from "./Navbar";
import "./App.scss";
import { useState } from "react";
import VideoComponent from "./VideoComponent";

function App() {
  //state
  const [questionText, setQuestionText] = useState("");

  //functions
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
          <VideoComponent />
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
      </div>
    </>
  );
}

export default App;
