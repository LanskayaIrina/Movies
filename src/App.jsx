import React from 'react';

import Movie from './components/movie';
import { API_URL, API_KEY_3 } from './utils/api';
import { MovieTabs } from './components/movieTab/MovieTabs';
import './App.css';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: '',
      page: 1,
      total_pages: 2,
    }
  }

  componentDidMount() {
    this.getMovies({ sort_by: this.state.sort_by, page: this.state.page });
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevState.sort_by !== this.state.sort_by) {
      this.getMovies({ sort_by: this.state.sort_by, page: this.state.page });
    }

    if (prevState.page !== this.state.page) {
      this.getMovies({ sort_by: this.state.sort_by, page: this.state.page });
    }
  }

  getMovies = async ({ sort_by, page = 1 }) => {
    try {
      const res = await fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${sort_by}&page=${page}`);
      const response = await res.json();

      this.setState({
        total_pages: response.total_pages,
        movies: response.results,
      });
    } catch (e) {
      console.log(e);
    }
  }

  deleteMovie = (id) => {
    const updateMovies = this.state.movies.filter(movie => movie.id !== id);

    this.setState({ movies: updateMovies });
  }

  addToMovieWillWatch = (movie) => {
    this.setState({ moviesWillWatch: [...this.state.moviesWillWatch, movie] });
  }

  rermoveFromWillWatch = (id) => {
    const updateMovies = this.state.moviesWillWatch.filter(movie => movie !== id);

    this.setState({ moviesWillWatch: updateMovies });
  }

  updateSortBy = (value) => {
    this.setState({ sort_by: value });
  }

  onNextPage = () => {
    this.setState({ page: this.state.page + 1 });
  }

  onPrevPage = () => {
    this.setState({ page: this.state.page - 1 });
  }

  render() {

    return (
      <div className="App">
        <div className="container pb-3">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="main-title">Movies</h1>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-9">
              <MovieTabs
                sortBy={this.state.sort_by}
                updateSortBy={this.updateSortBy}
              />
            </div>
            <div className="col-3 d-flex align-items-center">
              <span><b>Will watch: </b>{this.state.moviesWillWatch.length}</span>
            </div>
          </div>
          <div className="row">
            {this.state.movies.map(movie =>
              <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={movie.id}>
                <Movie
                  movie={movie}
                  deleteMovie={this.deleteMovie}
                  addToMovieWillWatch={this.addToMovieWillWatch}
                  rermoveFromWillWatch={this.rermoveFromWillWatch}
                />
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-10 d-flex justify-content-center">
              <div className="row">
                {this.state.page !== 1 &&
                  <button className="btn btn-secondary" onClick={this.onPrevPage}>back</button>}
                <div className="col-sm page">Page: {this.state.page}</div>
                {(this.state.page !== this.state.totalPage) &&
                  <button className="btn btn-secondary" onClick={this.onNextPage}>next</button>
                }
              </div>
            </div>
            <div className="col-2">Total: {this.state.totalPage}</div>
          </div>
        </div>
      </div>
    );
  };
};

export default App;
