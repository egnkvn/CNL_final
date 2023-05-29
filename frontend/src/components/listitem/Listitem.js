import "./listitem.css";
import { useState } from "react";
import { Button } from '@material-ui/core';
import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import { Link } from "react-router-dom";

export default function Listitem({ index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectVideo, setSelectVideo] = useState(false);
 
  return (
    <div
      className="listItem"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to="/VideoPlayground">
        <img
          src="https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee"
          alt=""
        />
      </Link>
      {/* {isHovered && (
          <div>
            <Link to="/VideoPlayground">
              <img 
                src="https://cooley.rcsdk8.org/sites/main/files/imagecache/hero/main-images/camera_lense_0.jpeg"
                alt=""
              />
            </Link>
          </div>
      )} */}
    </div>
  );
}