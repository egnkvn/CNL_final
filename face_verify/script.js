const video = document.getElementById("video");

Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromUri("./models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
]).then(startWebcam);

function startWebcam() {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((error) => {
      console.error(error);
    });
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

function getLabeledFaceDescriptions() {
  const labels = ["matt"];
  return Promise.all(
    labels.map(async (label) => {
      const descriptions = [];
      for (let i = 1; i <= 1; i++) {
        
        const img = await faceapi.fetchImage(`./labels/${label}/${i}.jpg`);
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

function softmax(logits) {
  const maxLogit = Math.max(...logits);
  const scores = logits.map(l => Math.exp(l - maxLogit));
  const denom = scores.reduce((a, b) => a + b);
  return scores.map(s => s / denom);
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

video.addEventListener("play", async () => {
  const labeledFaceDescriptors = await getLabeledFaceDescriptions();
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  let img_encoder = './models/clip-image-vit-32-float32.onnx';
  const img_session = await ort.InferenceSession.create(img_encoder);
  console.log("Image Model loaded.");

  let text_encoder = './models/clip-text-vit-32-float32-int32.onnx'
  const text_session = await ort.InferenceSession.create(text_encoder);
  let Tokenizer = (await import("https://deno.land/x/clip_bpe@v0.0.6/mod.js")).default;
  console.log("Text Model loaded.");

  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);

  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video)
      .withFaceLandmarks()
      .withFaceDescriptors();

    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    const results = resizedDetections.map((d) => {
      return faceMatcher.findBestMatch(d.descriptor);
    });
    if (results.length > 1){
      console.log(results.length)
    }
    else{
      results.forEach((result, i) => {
        if(result["_label"] == "unknown"){
          console.log("unauthorized!")
          flag=0
        }
        else{
          flag=1
        }
      });
      if(flag==1){
        let rgbData = await getRgbData(video);
        const img_feeds = {'input': new ort.Tensor('float32', rgbData, [1,3,224,224])};
        const img_result = await img_session.run(img_feeds);
        const content = ["a person in front of camera", "a person holding a picture in front of camera", "a picture"]
        _text = [];
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
          console.log("scam!");
        }
      }
    }
  }, 100);
});
