import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { Button, TextField } from '@material-ui/core';
import { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Navs = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [result, setResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const getSearch = async (keyword, subject) => {
    const {
      data: { videos },
    } = await axios.get("http://localhost:4000/video/search",{
      params: {
        keyword: keyword,
        subject: subject
      }
    });
    console.log(videos.length);
  };

  const handleSearch = () => {
    console.log('Performing search for:', searchQuery);
    getSearch(searchQuery, undefined);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <span><Link to="/">Home</Link></span>
          <span><Link to="/VideoPlayground">Video Playground</Link></span>
        </div>
        <div className="right">
        <TextField
          value={searchQuery}
          onChange={handleInputChange}
          variant="outlined"
          placeholder="Search"
          InputProps={{
            style: { color: 'white' },
            endAdornment: (
                <Search className="icon" onClick={handleSearch}/>
            ),
          }}
        />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navs;