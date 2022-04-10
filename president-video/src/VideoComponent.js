
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import io from 'socket.io-client';



const VideoComponent = () => {

  const videoRef = useRef(null);

  useEffect(() => {
    getVideo();
  }, [videoRef]);


  const getVideo = () => {
    navigator.mediaDevices
    // .getDisplayMedia({video: true})
      // .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  return (
        <video ref={videoRef} />
  );
};

export default VideoComponent;
