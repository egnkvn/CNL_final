import "./videoplayground.css";
import Navs from "../../components/navbar/Navs";
import Webcam from "react-webcam";
import { CameraOptions, useFaceDetection } from "react-use-face-detection";
import { Camera } from "@mediapipe/camera_utils";
import FaceDetection from "@mediapipe/face_detection";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const width = 500;
const height = 500;

const VideoPlayground = () => {

  const [play, setPlay] = useState(true);
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
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

  const location = useLocation();
  const path = location.state.video.path;
  const title = location.state.video.title;
  const subject = location.state.subject;

  const updateSearching = async (value) => {
    setSearching(value);
  };

  const updateSearchResult = (value) => {
    setSearchResult(value);
  };

  return (
    <div>
      <Navs
        updateSearching={updateSearching}
        updateSearchResult={updateSearchResult}
        subject={subject}
      />
      {facesDetected === 1 ? (
        <div className="videoPlayer">
          <div className="margin"/>
          <iframe
              src={path}
              title={path}
              style={{border:"0" ,height:"360px", width:"640px"}}
              allowFullScreen="true"
              allow="encrypted-media"
            ></iframe>
            <h1>{title}</h1>
        </div>
      ) : (
        <div className="videoPlayer">
          {/* {console.log(facesDetected)} */}
          {/* {alert('There are ', {facesDetected}, 'face detected. Video stopped.')} */}
          <div className="margin"/>
          <h1>Video stopped. More than one face detected, or there isn't any face in front of device.</h1>
        </div>
      )}
      <Webcam ref={webcamRef} className="hidden-webcam" />
      {/* <h2>{facesDetected}</h2> */}
    </div>
  );
};

export default VideoPlayground;
