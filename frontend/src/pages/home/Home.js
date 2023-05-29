import Navs from "../../components/navbar/Navs";
import "./home.css";
import List from "../../components/list/List";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Grid } from '@material-ui/core';


const Home = () => {

  const [selectVideo, setSelectVideo] = useState(-1);
  const [subject, setSubject] = useState([]);

  const getSubject = async () => {
    const {
      data: { subject },
    } = await axios.get("http://localhost:4000/video/subject");
    setSubject(subject);
  };

  useEffect(() => {
    getSubject();
  }, []);

  return (
    <div className="home">
      <Navs />
      <div className="topmargin"/>
      <List handleVideo={setSelectVideo} />
      <div className="subjectBox">
        {subject.map((item) => {
          return (
            <div className="subjectItem">
              <Button>
                <h1>{item}</h1>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
