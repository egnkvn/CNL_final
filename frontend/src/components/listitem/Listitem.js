import "./listitem.css";
import { useState, useEffect } from "react";
import { Button } from '@material-ui/core';
import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import { Link } from "react-router-dom";

export default function Listitem({ ...props }) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectVideo, setSelectVideo] = useState(false);

  useEffect(() => {
    console.log(props);
  }, [props]);

  return (
    <div
      className="listItem"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={{
        pathname: "/VideoPlayground",
        state: {
          url: props.path
        }}}>
        <img
          src={props.cover}
          alt=""
        />
      </Link>
    </div>
  );
}