import api from "../api";

export function setMoviesTab(state, payload) {
  state.moviesTab = payload;
}

export function setMovies(state, payload) {
  state.movies = payload;
}

export function setCurrentPage(state, payload) {
  state.currentPage = payload;
}

export function setTotalPages(state, payload) {
  state.totalPages = payload;
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
  state.imdbRating = null;
  state.imdbVotes = null;
  state.rottenTomatoesRating = null;
  state.metacriticRating = null;
  state.movieActors = [];
  state.movieWriters = [];
  state.movieDirectors = [];
  state.similarMovies = {};
  state.movieAwards = "";
}

export function setRatings(state, { imdbRating, imdbVotes, ratings }) {
  state.imdbRating = imdbRating ? imdbRating : "N/A";
  state.imdbVotes = imdbVotes ? imdbVotes : "N/A";
  let rt = false;
  let mc = false;
  if (ratings) {
    ratings.forEach(element => {
      if (element.Source.includes("Tomatoes")) {
        state.rottenTomatoesRating = element.Value;
        rt = true;
      }
      if (element.Source.includes("Metacritic")) {
        state.metacriticRating = element.Value;
        mc = true;
      }
    });
  }
  if (rt === false) {
    state.rottenTomatoesRating = "N/A";
  }
  if (mc === false) {
    state.metacriticRating = "N/A";
  }
}

export function setCastAndCrew(state, { actors, writers, directors }) {
  if (actors) {
    state.movieActors = actors.split(", ");
  }
  if (writers) {
    if (writers.includes(",")) {
      state.movieWriters = writers.split(", ");
    } else {
      state.movieWriters.push(writers);
    }
  }
  if (directors) {
    if (directors.includes(",")) {
      state.movieDirectors = directors.split(", ");
    } else {
      state.movieDirectors.push(directors);
    }
  }
}

export function setAwards(state, { awards }) {
  state.movieAwards = awards ? awards : "Not sure if any!";
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

// export function setSimilarMovies(state, payload) {
//   state.similarMovies = payload;
// }

// export function setSimilarMoviesCurrentPage(state, payload) {
//   state.setSimilarMoviesCurrentPage = payload;
// }

// export function setSimilarMoviesTotalPages(state, payload) {
//   state.setSimilarMoviesTotalPages = payload;
// }

export function setSearchType(state, payload) {
  state.searchType = payload;
}

export function setSearchResults(state, payload) {
  state.searchResultsCurrentPage = payload.page;
  state.searchResultsTotalPages = payload.total_pages;
  state.searchResults = payload.results;
}

// export function failedToRetrieveImdbMeta(state) {
//   state.imdb_rating = "!";
//   state.imdb_rating_count = "!";
// }
