import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";
import logo from "../src/images/logo.png";
import rottenTomaoes from "../src/images/illustration-empty-state.png";
import classes from "../src/styles/styles.module.css";
import { FiSearch } from "react-icons/fi";

export const API_KEY = "a9118a3a";

function App() {
  const [searchQuery, updateSearchQuery] = useState("");

  //For Data updating in the state rendered to the Movie List
  const [movieList, updateMovieList] = useState([]);
  
  //For every movie selected to have a special movie info page on it own
  const [selectedMovie, onMovieSelect] = useState();

  //For debouncing
  const [timeoutId, updateTimeoutId] = useState();

  //Axios for fetching api
  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    );
    updateMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    onMovieSelect("");
    //Clear time out to stop making repeated API calls
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    //For debouncing of search input
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };
  return (
    <div>
      <header className={classes.header}>
        <div className={classes.logoCon}>
          <img src={logo} alt="logo" className={classes.logo} />
        </div>

        <div className={classes.searchBarCon}>
          <FiSearch className={classes.searchIcon} />

          <input
            type={"text"}
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
            className={classes.searchBar}
          />
        </div>
      </header>
      {selectedMovie && (
        <MovieInfoComponent
          selectedMovie={selectedMovie}
          onMovieSelect={onMovieSelect}
        />
      )}
      <div className={classes.fetchedMovies}>
       {/*If movies is avaliable on the mapped array of movie if not display No movies*/}
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              overlayTitle={"abc"}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <div className={classes.placeholderCon}>
            <img src={rottenTomaoes} className={classes.placeholder} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
