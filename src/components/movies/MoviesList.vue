<template>
  <div class="container" style="width: 100%" ref="page_container">
    <div class="q-pa-md row flex flex-center q-gutter-md">
      <movie-list-item
        v-for="movie in moviesList"
        :key="movie.id"
        :title="movie.title"
        :id="movie.id"
        :original_language="movie.original_language"
        :original_title="movie.original_title"
        :genre_ids="movie.genre_ids"
        :overview="movie.overview"
        :release_date="movie.release_date"
        :poster_path="movie.poster_path"
        :vote_average="movie.vote_average"
      ></movie-list-item>
    </div>
    <div class="q-pa-lg row flex flex-center">
      <q-pagination
        v-model="currentPage"
        :max="totalPages"
        :max-pages="8"
        :boundary-numbers="true"
      >
      </q-pagination>
    </div>
    <div class="q-pa-md row q-gutter-md items-start">
      <q-page-scroller
        style="visibility: hidden"
        position="bottom-right"
        :scroll-offset="150"
        :offset="[18, 18]"
      >
        <q-btn
          ref="page_scroller"
          fab
          icon="keyboard_arrow_up"
          color="accent"
        />
      </q-page-scroller>
    </div>
  </div>
</template>

<script>
import MoviesListItem from "components/movies/MovieListItem";
import { scroll } from "quasar";
const { getScrollTarget, setScrollPosition } = scroll;

export default {
  name: "MoviesList",
  components: {
    "movie-list-item": MoviesListItem
  },
  props: {
    type: {
      // valid values :
      // popular
      // top_rated
      type: String,
      required: true
    }
  },
  computed: {
    moviesList() {
      return this.$store.state.movies.movies;
    },
    currentPage: {
      get: function() {
        return this.$store.state.movies.currentPage;
      },
      set: function(val) {
        this.scrollToTop();
        this.$store.dispatch("movies/fetchMovies", val);
      }
    },
    totalPages() {
      return this.$store.state.movies.totalPages;
    }
  },
  methods: {
    scrollToTop() {
      const topElement = this.$refs.page_container;
      const target = getScrollTarget(topElement);
      const offset = topElement.offsetTop;
      const duration = 300;
      setScrollPosition(target, offset, duration);
    }
  },
  mounted() {
    if (this.currentPage) {
      this.$store.commit(
        "movies/setMoviesTab",
        this.$store.state.movies.previousMoviesTab
      );
      this.$store.dispatch("movies/fetchMovies", this.currentPage);
    } else {
      this.$store.dispatch("movies/fetchMovies", 1);
    }
  }
};
</script>
