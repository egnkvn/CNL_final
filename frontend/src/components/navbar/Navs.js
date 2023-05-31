import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { Button, TextField } from '@material-ui/core';
import { useState, useEffect } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import axios from "../../axios.js";

const Navs = ({ updateSearching, updateSearchResult }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    console.log('Performing search for:', searchQuery);
    // await getSearch(searchQuery, undefined);
    const {
      data: { videos },
    } = await axios.get("/api/video/search", {
      params: {
        keyword: searchQuery,
        subject: undefined,
      },
    });
    updateSearchResult(videos);
    updateSearching(true);
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
          <span onClick={() => updateSearching(false)}><Link to="/"><h1>Home</h1></Link></span>
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
          {/* <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span>Logout</span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navs;