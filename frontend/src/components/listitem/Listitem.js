import "./listitem.css";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { useState } from "react";
import { Button } from '@material-ui/core';
import ReactPlayer from 'react-player'
import bb from '../../videos/tabata.mp4';
import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";

export default function Listitem({ index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectVideo, setSelectVideo] = useState(false);
 
  return (
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src="https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee"
        alt=""
      />
      {isHovered && (
        <>
          {/* <ReactPlayer
            className='react-player fixed-bottom'
            url= {bb}
            width='100%'
            height='100%'
            controls = {true}
          /> */}
          <div className="itemInfo">
            <div className="icons">
              <PlayArrow className="icon" handleOnclick = {console.log(index)}/>
              <Add className="icon" onClick={() => console.log(0)}>
                <Button  />
              </Add>
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownOutlined className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>1 hour 14 mins</span>
              <span className="limit">+16</span>
              <span>1999</span>
            </div>
            {/* <div className="desc">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Praesentium hic rem eveniet error possimus, neque ex doloribus.
            </div> */}
            <div className="genre">Action</div>
          </div>
        </>
      )}
    </div>
  );
}