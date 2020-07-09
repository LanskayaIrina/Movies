import React, { useState } from 'react';

import poster from '../../accets/poster.jpeg';
const classNames = require('classnames');

export const Movie = ({ movie, deleteMovie, addToMovieWillWatch, rermoveFromWillWatch }) => {
  const [willWatch, setWillWatch] = useState(false);
  const src = movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : '';
  const btnWillWatch = classNames({
    'btn': true,
    'btn-success': willWatch,
    'btn-secondary': !willWatch,
   })

  return (
    <div className="card movie">
      <img className="card-img-top movie-img" src={src || poster} alt="poster" />
      <div className="card-body">
        <h4 className="card-title movie-title">
          {movie.title}
        </h4>
        <p className="mb-1">Rating: {movie.vote_average}</p>
        <div className="d-flex justify-content-between align-items-center">
          <button type="button"
            className={btnWillWatch}
            onClick={willWatch ? () => {
              rermoveFromWillWatch(movie.id);
              setWillWatch(!willWatch)
            } : () => {
              addToMovieWillWatch(movie.id);
              setWillWatch(!willWatch)
            }}>{willWatch ? 'Watched' : 'Will watch'}</button>
          <button type="button" className="btn btn-secondary" onClick={() => deleteMovie(movie.id)}>delite</button>
        </div>
      </div>
    </div>
  );
};
