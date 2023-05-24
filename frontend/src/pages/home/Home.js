import Navs from "../../components/navbar/Navs";
import Featured from "../../components/featured/Featured";
import "./home.css";
import List from "../../components/list/List";
import React, { useState } from 'react';
import Webcam from "react-webcam";
import { CameraOptions, useFaceDetection } from 'react-use-face-detection';
import { Camera } from '@mediapipe/camera_utils';
import FaceDetection from '@mediapipe/face_detection';

const width = 500;
const height = 500;

const Home = () => {

  const { webcamRef, boundingBox, isLoading, detected, facesDetected } = useFaceDetection({
    faceDetectionOptions: {
      model: 'short',
    },
    faceDetection: new FaceDetection.FaceDetection({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    }),
    camera: ({ mediaSrc, onFrame }) =>
      new Camera(mediaSrc, {
        onFrame,
        width,
        height,
      }),
    });
  const [selectVideo, setSelectVideo] = useState(-1);
  const [facenumber, setFacenumber] = useState(0);
  return (
    <div className="home">
      <Navs/>
      <h1> </h1>
      <h1> </h1>
      <h1> </h1>
      {/* <Featured/> */}
      <List handleVideo = {setSelectVideo}/>
      <Webcam ref={webcamRef} className="hidden-webcam" />
      <h2>{facesDetected}</h2>
    </div>
    
  );
};

export default Home;