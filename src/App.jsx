import React from 'react';

import Movie from './components/movie';
import { API_URL, API_KEY_3 } from './utils/api';
import { MovieTabs } from './components/movieTab/MovieTabs';
import './App.css';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [],
      moviesWillWatch: [],
      sort_by: '',
      page: 1,
      totalPage: 2,
    }
  }

  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevState.sort_by !== this.state.sort_by) {
      this.getMovies();
    }
  }

  getMovies = async (page = 1) => {
    try {
      const res = await fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${page}`);
      const response = await res.json();

      this.setState({ totalPage: response.total_pages });
      this.setState({ data: response.results });
    } catch (e) {
      console.log(e);
    }
  }

  deleteMovie = (id) => {
    const updateMovies = this.state.data.filter(movie => movie.id !== id);

    this.setState({ data: updateMovies });
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

  toNextPage = () => {
    this.setState({ page: this.state.page + 1 });
    this.getMovies(this.state.page + 1);
  }

  toPrevPage = () => {
    this.setState({ page: this.state.page - 1 });
    this.getMovies(this.state.page - 1);
  }

  render() {

    return (
      <div className="App">
        <div className="container pb-3">
          <div className="row">
            <div className="col-9">
              <div className="row">
                <MovieTabs
                  sort_by={this.state.sort_by}
                  updateSortBy={this.updateSortBy}
                />
                <div className="row">
                  {this.state.data.map(movie =>
                    <div className="col-6 mb-4" key={movie.id}>
                      <Movie
                        movie={movie}
                        deleteMovie={this.deleteMovie}
                        addToMovieWillWatch={this.addToMovieWillWatch}
                        rermoveFromWillWatch={this.rermoveFromWillWatch}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-3">
              <p>Will watch: {this.state.moviesWillWatch.length}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-10 d-flex justify-content-center">
              <div className="row">
                {this.state.page !== 1 &&
                  <button className="btn btn-secondary" onClick={this.toPrevPage}>back</button>}
                <div className="col-sm page">Page: {this.state.page}</div>
                {(this.state.page !== this.state.totalPage) &&
                  <button className="btn btn-secondary" onClick={this.toNextPage}>next</button>
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
