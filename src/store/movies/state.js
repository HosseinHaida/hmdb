export default function() {
  return {
    drawerCollapseStatus: false,
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
    searchResultsFetching: false,
    noSearchResults: false,
    searchText: "",
    searchResults: {},
    searchResultsCurrentPage: 1,
    searchResultsTotalPages: 0
    // similarMovies: {},
    // similarMoviesCurrentPage: 1,
    // similarMovieSTotalPages: 0
  };
}
