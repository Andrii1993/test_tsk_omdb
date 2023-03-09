import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import style from './style.module.css';
import Head from 'next/head';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const searchMovies = async () => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?apikey=fa586b6&s=${searchTerm}`);
      if (response.data.Response === 'True') {
        setResults(response.data.Search);
        setError('');
      } else {
        setError('No results found');
      }
    } catch (error) {
      setError(error.message);
    }
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    searchMovies();
  }

  return (
    <>
    <Head>
      <meta keywords="test tsk omdb"></meta>
      <title>TEST TSK OMDB</title>
    </Head>
    <div className={style.result_page}>
      <form onSubmit={handleSubmit} className={style.search}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
          className={style.input}
          placeholder="Search..."
        />
        <button type="submit" className={style.btn}>
          Search
        </button>
      </form>
      {error && <div>{error}</div>}
      <ul className={style.result}>
        {results.map((movie) => (
          <div key={movie.imdbID} className={style.result_card}>
            <Link href={`/movie/${movie.imdbID}`}>
              {movie.Poster !== "N/A" ? (
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className={style.result_img}
                />
              ) : (
                <div>No image available</div>
              )}
              <h3>
                {movie.Title} ({movie.Year})
              </h3>
            </Link>
          </div>
        ))}
      </ul>
      {results.length === 5 && !error && (<div>No results found</div>)}
    </div>
    </>
  );
}

export default SearchBar;

