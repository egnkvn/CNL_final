import Navs from "../../components/navbar/Navs";
import "./home.css";
import List from "../../components/list/List";
import React, { useState, useEffect } from "react";
import axios from "../../axios.js";
import { Button, Grid } from "@material-ui/core";
import Listitem from "../../components/listitem/Listitem";

const Home = () => {
  const [subject, setSubject] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const getSubject = async () => {
    const {
      data: { subject },
    } = await axios.get("/api/video/subject");
    setSubject(subject);
  };

  useEffect(() => {
    getSubject();
  }, []);

  const handleClick = async (item) => {
    console.log("Performing search for:", item);
    const {
      data: { videos },
    } = await axios.get("/api/video/search", {
      params: {
        keyword: item,
        subject: undefined,
      },
    });
    updateSearchResult(videos);
    updateSearching(true);
  };

  const updateSearching = async (value) => {
    setSearching(value);
  };

  const updateSearchResult = (value) => {
    setSearchResult(value);
  };

  useEffect(() => {
    console.log(searchResult);
  }, [searchResult]);

  return (
    <div className="home">
      <div className="topmargin" />
      <Navs
        updateSearching={updateSearching}
        updateSearchResult={updateSearchResult}
      />
      {searching ? (
        <>
          <div className="resultWrapper">
            {searchResult.map((video) => {
              return (
                <div className="resultBox">
                  <Listitem {...video} />
                  <p>{video.title}</p>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <List />
          <div className="subjectBox">
            {subject.map((item) => {
              return (
                <div className="subjectItem">
                  <Button onClick={() => handleClick(item)}>
                    <h1>{item}</h1>
                  </Button>
                </div>
              );
            })}
            {/* <iframe
              src="https://player.vdocipher.com/v2/?otp=20160313versASE323X5Ro5zepZwRl2c3zPyBNxj1y2eI8iz94usRnTYw2jHU4M2&playbackInfo=eyJ2aWRlb0lkIjoiOThhYzQ5OGMzZjZhNDUyMTliNjE4MzI0YjY3MDhhYWIifQ=="
              style={{border:"0" ,height:"360px", width:"640px"}}
              allowFullScreen="true"
              allow="encrypted-media"
            ></iframe> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
