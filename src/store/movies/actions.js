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
        });
    });
}

export async function searchApi({ commit, state }) {
  commit("setSearchResultsFetching", true);
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
      if (response.data.results[0]) {
        commit("setNoSearchResults", false);
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
      } else {
        commit("setNoSearchResults", true);
        commit("setSearchResults", {});
      }
    });
}

export async function findPerson({ commit, state }, payload) {
  commit("setFetchingPerson", true);
  return http
    .get(
      api.baseUrl + api.personBaseUrl + "/" + payload + "?api_key=" + api.key
    )
    .then(
      response => {
        commit("setFetchingPerson", false);
        commit("setQueriedPerson", {
          name: response.data.name,
          id: response.data.id,
          biography: response.data.biography,
          deathday: response.data.deathday,
          birthday: response.data.birthday,
          homepage: response.data.homepage,
          also_known_as: response.data.also_known_as,
          place_of_birth: response.data.place_of_birth,

          profile_path: response.data.profile_path
            ? api.moviePictursBaseUrl +
              response.data.profile_path +
              "?api_key=" +
              api.key
            : ""
        });
      },
      error => {
        commit("setFetchingPerson", false);
      }
    );
}

export async function fetchGenres({ commit, state }) {
  return http
    .get(api.baseUrl + api.genreListUrl + "?api_key=" + api.key)
    .then(response => {
      commit("setGenres", response.data.genres);
    });
}
