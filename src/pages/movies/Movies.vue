<template>
  <q-page class="flex flex-left">
    <movies-list :type="moviesTab"></movies-list>
  </q-page>
</template>

<script>
import MoviesList from "components/movies/MoviesList";
export default {
  name: "Movies",
  components: {
    "movies-list": MoviesList
  },
  computed: {
    moviesTab() {
      return this.$store.state.movies.moviesTab;
    }
  },
  beforeMount() {
    this.$store.commit("movies/setMoviesTabInitially");
  },
  destroyed() {
    this.$store.commit("movies/resetMoviesTab", this.moviesTab);
  }
};
</script>
