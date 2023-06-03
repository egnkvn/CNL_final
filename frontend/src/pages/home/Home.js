import Navs from "../../components/navbar/Navs";
import "./home.css";
import List from "../../components/list/List";
import React, { useState, useEffect } from "react";
import axios from "../../axios.js";
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
    <>
      <div className="background" />
      <div className="homepage">
        <div className="topmargin" />
        <Navs
          updateSearching={updateSearching}
          updateSearchResult={updateSearchResult}
          subject={subject}
        />
        <List subject={subject} />
        {searching ? (
          <>
            <div className="resultWrapper">
              {searchResult.map((video) => {
                return (
                  <div className="resultBox">
                    <Listitem video={video} subject={subject} />
                    <p>{video.title}</p>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="resultWrapper">
              <div className="resultBox"></div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
