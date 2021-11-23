import React, {  useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NavLink } from 'react-router-dom';

export default function Infinite(props) {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');
	const [page, setpage] = useState(1);
    const [type, settype] = useState("movie");

    function getPhotos() {
	  
    let apiURI = `https://www.omdbapi.com/?i=tt3896198&apikey=${props.myKey}`;
    if (query) apiURI = `https://www.omdbapi.com/?i=tt3896198&apikey=${props.myKey}&s=${query}&p=${page}&type=${type}`;
    
    fetch(apiURI)
      .then((res) => res.json())
      .then((data) => {

		  console.log("query && data.Response ", (query && data.Response));
		  if (query){ setMovies((movies) => [...movies, ...data.Search ])}
      });
    }
	useEffect(() => {
		getPhotos()
	},[page])
    function searchMovie(e) {
    e.preventDefault();
	setMovies([])
    getPhotos();
  }

  function handleChange(e){
    settype(e.target.value)
  }

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">{type}</h1>
        <div className="search">
            <form  onSubmit={searchMovie}>
                <input
                    type="text"
                    name="query"
                    placeholder="Search Films"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div className="selectAndButton">
                <select onChange={handleChange}>
                    <option value="movie">movie</option>
                    <option value="episode">episode</option>
                    <option value="series">series</option>
                </select>
                <button type="submit">Search</button>
                </div>
            </form>
        </div>
      </div>
      
      <InfiniteScroll
      dataLength={movies.length}
      hasMore={true}
      next={() => setpage(page + 1)}
      >
        <div className="flex">
            {movies.map((movie, index) => (
                <div className="card" key={index}>
                    <NavLink to={{
                      pathname: "/Film",
                      aboutProps:{
                        id: movie.imdbID
                      }
                    }} >
                      <img
                        className="movie_image"
                        src={movie.Poster}
                        alt="postal"
                      />
                    </NavLink>
                    <div className="movie_card">
                        <p className="heading">{movie.Title}<br></br>{movie.Year}</p>
                        <br />
                    </div>
                </div>
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
