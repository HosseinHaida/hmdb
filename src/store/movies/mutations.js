import api from "../api";

export function setMoviesTab(state, payload) {
  state.moviesTab = payload;
}

export function setMovies(state, payload) {
  state.movies = payload;
}

export function setMovie(state, payload) {
  state.movie = payload;
  state.movie.backdrop_path =
    api.moviePictursBaseUrl + payload.backdrop_path + "?api_key=" + api.key;
  state.movie.poster_path =
    api.moviePictursLQBaseUrl + payload.poster_path + "?api_key=" + api.key;
}

export function resetMovie(state) {
  state.movie = {};
  state.imdb_rating = null;
  state.imdb_rating_count = null;
}

export function setMovieImdbMeta(state, payload) {
  state.imdb_rating = payload.rating;
  state.imdb_rating_count = payload.ratingCount;
}

export function setCurrentPage(state, payload) {
  state.currentPage = payload;
}

export function setTotalPages(state, payload) {
  state.totalPages = payload;
}

export function setGenres(state, payload) {
  let genresObject = {};
  for (let i = 0; i < payload.length; i++) {
    genresObject[payload[i].id] = payload[i].name;
  }
  state.genres = genresObject;
}

export function setMoviesTabInitially(state) {
  state.moviesTab = "top_rated";
}

export function resetMoviesTab(state, payload) {
  state.previousMoviesTab = payload;
  state.moviesTab = "";
}

export function setSimilarMovies(state, payload) {
  state.similarMovies = payload;
}

export function setSimilarMoviesCurrentPage(state, payload) {
  state.setSimilarMoviesCurrentPage = payload;
}
export function setSimilarMoviesTotalPages(state, payload) {
  state.setSimilarMoviesTotalPages = payload;
}

// export function failedToRetrieveImdbMeta(state) {
//   state.imdb_rating = "!";
//   state.imdb_rating_count = "!";
// }
