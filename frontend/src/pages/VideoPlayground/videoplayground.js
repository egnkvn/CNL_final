import * as faceapi from '@vladmandic/face-api';
import * as ort from 'onnxruntime-web';
import "./videoplayground.css";
import ReactPlayer from "react-player";
import Navs from "../../components/navbar/Navs";
import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const videoHeight = 480;
const videoWidth = 640;

function getLabeledFaceDescriptions() {
  const labels = ["gordon"];
  return Promise.all(
    labels.map(async (label) => {
      const descriptions = [];
      for (let i = 1; i <= 1; i++) {
        const Image_URL = process.env.PUBLIC_URL + '/labels'
        const img = await faceapi.fetchImage(Image_URL + `/${label}/${i}.jpg`);
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detections.descriptor);
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
}

function cosineSimilarity(A, B) {
  if(A.length !== B.length) throw new Error("A.length !== B.length");
  let dotProduct = 0, mA = 0, mB = 0;
  for(let i = 0; i < A.length; i++){
    dotProduct += A[i] * B[i];
    mA += A[i] * A[i];
    mB += B[i] * B[i];
  }
  mA = Math.sqrt(mA);
  mB = Math.sqrt(mB);
  let similarity = dotProduct / (mA * mB);
  return similarity;
}

async function getRgbData(video) {
  let img = await createImageBitmap(video);
  let canvas = new OffscreenCanvas(224, 224);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  let rgbData = [[], [], []]; // [r, g, b]
  // remove alpha and put into correct shape:
  let d = imageData.data;
  for(let i = 0; i < d.length; i += 4) { 
    let x = (i/4) % canvas.width;
    let y = Math.floor((i/4) / canvas.width)
    if(!rgbData[0][y]) rgbData[0][y] = [];
    if(!rgbData[1][y]) rgbData[1][y] = [];
    if(!rgbData[2][y]) rgbData[2][y] = [];
    rgbData[0][y][x] = d[i+0]/255;
    rgbData[1][y][x] = d[i+1]/255;
    rgbData[2][y][x] = d[i+2]/255;
    // From CLIP repo: Normalize(mean=(0.48145466, 0.4578275, 0.40821073), std=(0.26862954, 0.26130258, 0.27577711))
    rgbData[0][y][x] = (rgbData[0][y][x] - 0.48145466) / 0.26862954;
    rgbData[1][y][x] = (rgbData[1][y][x] - 0.4578275) / 0.26130258;
    rgbData[2][y][x] = (rgbData[2][y][x] - 0.40821073) / 0.27577711;
  }
  rgbData = Float32Array.from(rgbData.flat().flat());
  return rgbData;
}

const VideoPlayground = () => {
  const [play, setPlay] = useState(true);
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const videoRef = useRef();
  let flag = 0
  useEffect(() => {
    startVideo();
    videoRef && loadModels();
  }, []);

  const loadModels = () => {
    const MODEL_URL = process.env.PUBLIC_URL + '/models'
    Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    ]).then(() => {
      face_recognition();
    })
  };

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
        var playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(_ => {
            // Automatic playback started!
            // Show playing UI.
          })
          .catch(error => {
            // Auto-play was prevented
            // Show paused UI.
          });
        }
      })
      .catch((err) => {
        console.error(err)
      });
  }

  const face_recognition = async () => {
    const labeledFaceDescriptors = await getLabeledFaceDescriptions();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);
    const MODEL_URL = process.env.PUBLIC_URL + '/models'
    console.log(MODEL_URL + '/clip-image-vit-32-float32.onnx')
    const img_session = await ort.InferenceSession.create(MODEL_URL + '/clip-image-vit-32-float32.onnx');
    console.log("Image Model loaded.");
  
    const text_session = await ort.InferenceSession.create(MODEL_URL + '/clip-text-vit-32-float32-int32.onnx');
    let Tokenizer = (await import("https://deno.land/x/clip_bpe@v0.0.6/mod.js")).default;
    console.log("Text Model loaded.");
  
    const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
    faceapi.matchDimensions(videoRef.current, displaySize);
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current)
        .withFaceLandmarks()
        .withFaceDescriptors();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      const results = resizedDetections.map((d) => {
        return faceMatcher.findBestMatch(d.descriptor);
      });
      if (results.length > 1){
        console.log("more than one people")
        flag = 0
      }
      else{
        results.forEach((result, i) => {
          if(result["_label"] == "unknown"){
            console.log("unauthorized!")
            flag=2
          }
          else{
            flag=1
          }
        });
        if(flag==1){
          let rgbData = await getRgbData(videoRef.current);
          const img_feeds = {'input': new ort.Tensor('float32', rgbData, [1,3,224,224])};
          const img_result = await img_session.run(img_feeds);
          const content = ["a person in front of camera", "a person holding a picture in front of camera", "a picture"]
          const _text = [];
          for (let i = 0; i < content.length; i++){
            let t = new Tokenizer();
            let textTokens = t.encodeForCLIP(content[i]);
            textTokens = Int32Array.from(textTokens);
            const text_feeds = {'input': new ort.Tensor('int32', textTokens, [1, 77])};
            const text_result = await text_session.run(text_feeds);
            const data = cosineSimilarity(text_result["output"].data, img_result["output"].data)
            _text.push(data)      
          }
          console.log(`data of result tensor 'all results'`, _text);
        
          if(_text[0] <= _text[1] || _text[0] <= _text[1]){
            flag=3
            console.log("you're holding some picture")
          }
        }
      }
    }, 100);
  };
  const location = useLocation();
  const path = location.state;

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
      />
      {flag === 1 ? (
        <>
          <ReactPlayer
            className="react-player fixed-bottom"
            url={"http://localhost:4000/api/video/play?path=" + path}
            width="100%"
            height="100%"
            playing={play}
            controls={true}
          />
        </>
      ) : 
      flag === 0 ? (
        <>
          <h2>Video stopped. More than one face detected.</h2>
        </>
      ) : 
      flag === 2 ? (
        <>
        <h2>You are not an authorized user.</h2>
        </>
      ) : (
        <>
        <h2>Please show the camera your own face.</h2>
        </>
      )
      }
      <div>
          <video hidden="hidden" ref={videoRef} height={videoHeight} width={videoWidth} />
      </div>
    </div>
    
);
};

export default VideoPlayground;