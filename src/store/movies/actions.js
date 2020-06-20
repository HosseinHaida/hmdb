import api from "../api";
import http from "../http";

export async function fetchMovies({ commit, state }, pageNumber) {
  return http
    .get(
      api.baseUrl +
        api.moviesBaseUrl +
        "/" +
        state.moviesTab +
        "?api_key=" +
        api.key +
        "&page=" +
        pageNumber
    )
    .then(response => {
      commit(
        "setMovies",
        response.data.results.map(singleMovie => {
          return {
            title: singleMovie.title,
            id: singleMovie.id,
            original_language: singleMovie.original_language,
            original_title: singleMovie.original_title,
            genre_ids: singleMovie.genre_ids,
            overview: singleMovie.overview,
            release_date: singleMovie.release_date,
            poster_path:
              api.moviePictursLQBaseUrl +
              singleMovie.poster_path +
              "?api_key=" +
              api.key,
            vote_average: singleMovie.vote_average
          };
        })
      );
      commit("setCurrentPage", response.data.page);
      commit("setTotalPages", response.data.total_pages);
    });
}

export async function fetchMovieDetails({ commit, state }, payload) {
  return http
    .get(
      api.baseUrl +
        api.moviesBaseUrl +
        "/" +
        Number(payload) +
        "?api_key=" +
        api.key
    )
    .then(response => {
      commit("setMovie", response.data);
      http
        .get(
          "https://imdb8.p.rapidapi.com/title/get-ratings?tconst=" +
            response.data.imdb_id,
          {
            headers: {
              "x-rapidapi-host": "imdb8.p.rapidapi.com",
              "x-rapidapi-key":
                "c7950c0cdcmsh0e5987a2c04f074p11cc1ejsn7b3ac516c44a"
            }
          }
        )
        .then(response => {
          commit("setMovieImdbMeta", response.data);
          http
            .get(
              api.baseUrl +
                api.moviesBaseUrl +
                "/" +
                Number(payload) +
                "/similar?api_key=" +
                api.key +
                "&page=" +
                state.similarMoviesCurrentPage
            )
            .then(response => {
              commit("setSimilarMoviesCurrentPage", response.data.page);
              commit("setSimilarMoviesTotalPages", response.data.total_pages);
              commit(
                "setSimilarMovies",
                response.data.results.map(singleMovie => {
                  return {
                    title: singleMovie.title,
                    id: singleMovie.id,
                    original_language: singleMovie.original_language,
                    original_title: singleMovie.original_title,
                    genre_ids: singleMovie.genre_ids,
                    overview: singleMovie.overview,
                    release_date: singleMovie.release_date,
                    poster_path:
                      api.moviePictursLQBaseUrl +
                      singleMovie.poster_path +
                      "?api_key=" +
                      api.key,
                    vote_average: singleMovie.vote_average
                  };
                })
              );
            });
        });
    });
}

export async function fetchGenres({ commit, state }) {
  return http
    .get(api.baseUrl + api.genreListUrl + "?api_key=" + api.key)
    .then(response => {
      commit("setGenres", response.data.genres);
    });
}
