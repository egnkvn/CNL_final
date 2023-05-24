import Navs from "../../components/navbar/Navs";
import Featured from "../../components/featured/Featured";
import "./home.css";
import List from "../../components/list/List";
import React, { useState } from 'react';


const Home = () => {
  // const videoElement = document.getElementsByClassName('input_video')[0];
  // const canvasElement = document.getElementsByClassName('output_canvas')[0];
  // const canvasCtx = canvasElement.getContext('2d');
  // const drawingUtils = window;
  
  // function onResults(results) {
  //   // Draw the overlays.
  //   canvasCtx.save();
  //   canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  //   canvasCtx.drawImage(
  //       results.image, 0, 0, canvasElement.width, canvasElement.height);
  //   if (results.detections.length > 0) {
  //     drawingUtils.drawRectangle(
  //         canvasCtx, results.detections[0].boundingBox,
  //         {color: 'blue', lineWidth: 4, fillColor: '#00000000'});
  //     drawingUtils.drawLandmarks(canvasCtx, results.detections[0].landmarks, {
  //       color: 'red',
  //       radius: 5,
  //     });
  //   }
  //   console.log(results.detections.length)
  //   canvasCtx.restore();
  // }
  
  // const faceDetection = new FaceDetection({locateFile: (file) => {
  //   return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.0/${file}`;
  // }});
  // faceDetection.setOptions({
  //   model: 'short',
  //   minDetectionConfidence: 0.5
  // });
  // faceDetection.onResults(onResults);
  
  // const camera = new Camera(videoElement, {
  //   onFrame: async () => {
  //     await faceDetection.send({image: videoElement});
  //   },
  //   width: 1280,
  //   height: 720
  // });
  // camera.start();
  const [selectVideo, setSelectVideo] = useState(-1)
  return (
    <div className="home">
      <Navs/>
      <Featured/>
      <List handleVideo = {setSelectVideo}/>

      {/* <script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.1/camera_utils.js" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils@0.1/control_utils.js" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.1/drawing_utils.js" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.0/face_detection.js" crossorigin="anonymous"></script>
      <div class="container">
        <video class="input_video"></video>
        <canvas class="output_canvas" width="1280px" height="720px"></canvas>
      </div> */}
    </div>
    
  );
};

export default Home;