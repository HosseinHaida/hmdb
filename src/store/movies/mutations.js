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
    let writersArray = writers.split(", ");
    for (let i = 0; i < writersArray.length; i++) {
      state.movieWriters[i] = writersArray[i].replace(/ *\([^)]*\) */g, "");
    }
  }
  if (directors) {
    state.movieDirectors = directors.split(", ");
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

export function setSearchText(state, payload) {
  state.searchText = payload;
}

export function setSearchType(state, payload) {
  state.searchType = payload;
}

export function setSearchResults(state, payload) {
  state.searchResultsFetching = false;
  state.searchResults = payload;
}

export function setNoSearchResults(state, payload) {
  state.noSearchResults = payload;
}

export function setSearchResultsFetching(state, payload) {
  state.searchResultsFetching = payload;
}

export function setSearchResultsCurrentPage(state, payload) {
  state.searchResultsCurrentPage = payload;
}

export function setSearchResultsTotalPages(state, payload) {
  state.searchResultsTotalPages = payload;
}

export function setDrawerStatus(state, payload) {
  state.drawerCollapseStatus = payload;
}
