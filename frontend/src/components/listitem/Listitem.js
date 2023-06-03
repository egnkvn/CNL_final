import "./listitem.css";
import { useState, useEffect } from "react";
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom";

export default function Listitem({ video,subject}) {
  const [isHovered, setIsHovered] = useState(false);

  // useEffect(() => {
  //   console.log(video, subject);
  // }, []);

  return (
    <div
      className="listItem"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to="/VideoPlayground" state={{video,subject}}>
        <img
          src={video.cover}
          alt=""
        />
      </Link>
    </div>
  );
}