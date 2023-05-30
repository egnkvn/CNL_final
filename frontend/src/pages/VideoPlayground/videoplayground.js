import bb from '../../videos/Chin_Lec1.mp4';
import "./videoplayground.css";
import ReactPlayer from 'react-player';
import Navs from '../../components/navbar/Navs';
import Webcam from "react-webcam";
import { CameraOptions, useFaceDetection } from "react-use-face-detection";
import { Camera } from "@mediapipe/camera_utils";
import FaceDetection from "@mediapipe/face_detection";
import { useState } from "react";

const width = 500;
const height = 500;

const VideoPlayground = () => {
    const [play, setPlay] = useState(true);
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
    return (
        <div>
            <Navs />
            {facesDetected === 1 ? (
                <>
                  <ReactPlayer
                      className='react-player fixed-bottom'
                      url={bb}
                      width='100%'
                      height='100%'
                      playing={play}
                      controls={true}
                  />
                </>
                ) : (
                <>
                    {console.log(facesDetected)}
                    {/* {alert('There are ', {facesDetected}, 'face detected. Video stopped.')} */}
                    <h2>Video stopped. More than one face detected.</h2>
                </>
            )}
            <Webcam ref={webcamRef} className="hidden-webcam" />
            <h2>{facesDetected}</h2>
        </div>
    );
}

export default VideoPlayground;