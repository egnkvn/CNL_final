import Navs from "../../components/navbar/Navs";
import "./home.css";
import List from "../../components/list/List";
import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import { CameraOptions, useFaceDetection } from "react-use-face-detection";
import { Camera } from "@mediapipe/camera_utils";
import FaceDetection from "@mediapipe/face_detection";
import axios from "axios";
import { Button, Grid } from '@material-ui/core';

const width = 500;
const height = 500;

const Home = () => {
  const { webcamRef, boundingBox, isLoading, detected, facesDetected } =
    useFaceDetection({
      faceDetectionOptions: {
        model: "short",
      },
      faceDetection: new FaceDetection.FaceDetection({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
      }),
      camera: ({ mediaSrc, onFrame }) =>
        new Camera(mediaSrc, {
          onFrame,
          width,
          height,
        }),
    });
  const [selectVideo, setSelectVideo] = useState(-1);
  const [subject, setSubject] = useState([]);

  const getSubject = async () => {
    const {
      data: { subject },
    } = await axios.get("http://localhost:4000/video/subject");
    setSubject(subject);
  };

  useEffect(() => {
    getSubject();
  }, []);

  return (
    <div className="home">
      <Navs />
      <div className="topmargin"/>
      <List handleVideo={setSelectVideo} />
      <Webcam ref={webcamRef} className="hidden-webcam" />
      <div className="subjectBox">
        {subject.map((item) => {
          return (
            <div className="subjectItem">
              <Button>
                <h1>{item}</h1>
              </Button>
            </div>
          );
        })}
      </div>
      <h2>{facesDetected}</h2>
    </div>
  );
};

export default Home;
