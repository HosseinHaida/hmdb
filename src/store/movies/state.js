export default function() {
  return {
    moviesTab: "",
    movies: {},
    currentPage: 0,
    totalPages: 0,
    genres: {},
    movie: {},
    imdbRating: null,
    imdbVotes: null,
    rottenTomatoesRating: null,
    metacriticRating: null,
    movieActors: [],
    movieWriters: [],
    movieDirectors: [],
    movieAwards: "",
    searchType: "movie",
    searchResults: {},
    searchResultsCurrentPage: 1,
    searchResultsTotalPages: 0
    // similarMovies: {},
    // similarMoviesCurrentPage: 1,
    // similarMovieSTotalPages: 0
  };
}
