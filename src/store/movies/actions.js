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
          api.omdbBaseUrl +
            "?i=" +
            response.data.imdb_id +
            "&apikey=" +
            api.omdbKey
        )
        .then(response => {
          commit("setRatings", {
            imdbRating: response.data.imdbRating,
            imdbVotes: response.data.imdbVotes,
            ratings: response.data.Ratings
          });
          commit("setCastAndCrew", {
            actors: response.data.Actors,
            writers: response.data.Writer,
            directors: response.data.Director
          });
          commit("setAwards", { awards: response.data.Awards });
          // http
          //   .get(
          //     api.baseUrl +
          //       api.moviesBaseUrl +
          //       "/" +
          //       Number(payload) +
          //       "/similar?api_key=" +
          //       api.key +
          //       "&page=" +
          //       state.similarMoviesCurrentPage
          //   )
          // .then(response => {
          //   commit("setSimilarMoviesCurrentPage", response.data.page);
          //   commit("setSimilarMoviesTotalPages", response.data.total_pages);
          //   commit(
          //     "setSimilarMovies",
          //     response.data.results.map(singleMovie => {
          //       return {
          //         title: singleMovie.title,
          //         id: singleMovie.id,
          //         original_language: singleMovie.original_language,
          //         original_title: singleMovie.original_title,
          //         genre_ids: singleMovie.genre_ids,
          //         overview: singleMovie.overview,
          //         release_date: singleMovie.release_date,
          //         poster_path:
          //           api.moviePictursLQBaseUrl +
          //           singleMovie.poster_path +
          //           "?api_key=" +
          //           api.key,
          //         vote_average: singleMovie.vote_average
          //       };
          //     })
          //   );
          // });
        });
    });
}

export async function searchApi({ commit, state }) {
  return http
    .get(
      api.baseUrl +
        "/search/" +
        state.searchType +
        "?api_key=" +
        api.key +
        "&query=" +
        state.searchText +
        "&page=" +
        state.searchResultsCurrentPage
    )
    .then(response => {
      console.log(response.data.results);
      if (response.data.results[0].known_for) {
        commit(
          "setSearchResults",
          response.data.results.map(singlePerson => {
            return {
              id: singlePerson.id,
              name: singlePerson.name,
              known_for: singlePerson.known_for,
              known_for_department: singlePerson.known_for_department,
              profile_path: singlePerson.profile_path
                ? api.moviePictursBaseUrl +
                  singlePerson.profile_path +
                  "?api_key=" +
                  api.key
                : ""
            };
          })
        );
      } else if (response.data.results[0].title) {
        commit(
          "setSearchResults",
          response.data.results.map(singleMovie => {
            return {
              title: singleMovie.title,
              id: singleMovie.id,
              original_language: singleMovie.original_language,
              original_title: singleMovie.original_title,
              genre_ids: singleMovie.genre_ids,
              overview: singleMovie.overview,
              release_year: singleMovie.release_date
                ? singleMovie.release_date.slice(0, 4)
                : "N/A",
              poster_path: singleMovie.poster_path
                ? api.moviePictursLQBaseUrl +
                  singleMovie.poster_path +
                  "?api_key=" +
                  api.key
                : "",
              vote_average: singleMovie.vote_average
            };
          })
        );
      }
      commit("setSearchResultsCurrentPage", response.data.page);
      commit("setSearchResultsTotalPages", response.data.total_pages);
    });
}

export async function fetchGenres({ commit, state }) {
  return http
    .get(api.baseUrl + api.genreListUrl + "?api_key=" + api.key)
    .then(response => {
      commit("setGenres", response.data.genres);
    });
}
