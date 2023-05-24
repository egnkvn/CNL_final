import { ArrowBackOutlined } from "@material-ui/icons";
// import "./watch.scss";

const Watch = () => {
  return (
    <div className="watch">
      <div className="back">
        <ArrowBackOutlined />
        Home
      </div>
      <video
        className="video"
        autoPlay
        progress
        controls
        src="https://files-1.dlc.ntu.edu.tw/cool-video/202211/82652d97-f068-43a5-adef-4f5f3475e03f/transcoded.mp4?AWSAccessKeyId=C6ueMrUe5JyPkWQJAyKp&Expires=1683715168&Signature=NAvIrSggw5ehWy7ta%2F7zxpZsabg%3D&fbclid=IwAR0u8MbpQr2BTdVC8Q0ufyWhJLYQbjMSjtdy7N-2tjx4xeefvH9nijIO-eQ"
      />
    </div>
  );
}

export default Watch