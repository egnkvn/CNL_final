import "./listitem.css";
import { useState, useEffect } from "react";
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom";

export default function Listitem({ ...props }) {
  const [isHovered, setIsHovered] = useState(false);

  // useEffect(() => {
  //   console.log(props.path);
  // }, [props]);

  return (
    <div
      className="listItem"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to="/VideoPlayground" state={props.path}>
        <img
          src={props.cover}
          alt=""
        />
      </Link>
    </div>
  );
}