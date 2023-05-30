import {
    ArrowBackIosOutlined,
    ArrowForwardIosOutlined,
  } from "@material-ui/icons";
import { useRef, useState, useEffect  } from "react";
import Listitem from "../listitem/Listitem";
import "./list.css";
import axios from "axios";
  
const List = (setSelectVideo) => {
    const [isMoved, setIsMoved] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);
  
    const listRef = useRef();
  
    const [hotVideo, setHotVideo] = useState([]);

    const getHotVideo = async () => {
      const {
        data: { videos },
      } = await axios.get("http://localhost:4000/video/hot");
      setHotVideo(videos);
    };

    useEffect(() => {
      getHotVideo();
    }, []);

    const handleClick = (direction) => {
      setIsMoved(true);
      let distance = listRef.current.getBoundingClientRect().x - 50;
      if (direction === "left" && slideNumber > 0) {
        setSlideNumber(slideNumber - 1);
        listRef.current.style.transform = `translateX(${230 + distance}px)`;
      }
      if (direction === "right" && slideNumber < 5) {
        console.log(hotVideo[0].title);
        setSlideNumber(slideNumber + 1);
        listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      }
    };

    return (
      <div className="list">
        <span className="listTitle">Continue to watch</span>
        <div className="wrapper">
          <ArrowBackIosOutlined
            className="sliderArrow left"
            onClick={() => handleClick("left")}
            style={{ display: !isMoved && "none" }}
          />
          <div className="container" ref={listRef}>
            {hotVideo.map((item) => {
              return (
                <Listitem {...item} />
              )
            })}
          </div>
          <ArrowForwardIosOutlined
            className="sliderArrow right"
            onClick={() => handleClick("right")}
          />
        </div>
      </div>
    );
}

export default List;