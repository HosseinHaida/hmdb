<template
  ><div>
    <div class="back-img-mask">
      <q-img
        class="fixed fit back-img"
        transition="jump-down"
        :src="movie.backdrop_path"
      />
    </div>
    <div class="flex flex-left q-pa-md row q-gutter-md">
      <q-card class="movie-card">
        <q-img contain :src="movie.poster_path" />

        <q-card-section>
          <div class="text-h6 q-mb-md">{{ movie.title }}</div>
          <span v-if="movie.release_date" class="text-bold">
            <q-chip square :label="movie.release_date.slice(0, 4)" />
          </span>
          <q-chip square
            ><q-avatar color="accent" text-color="white" icon="mic" />
            <q-spinner-dots
              v-if="!movie.original_language"
              color="primary"
              size="2em"
            /><span v-else>{{ movie.original_language }}</span></q-chip
          >
          <q-chip square
            ><q-avatar color="accent" text-color="white" icon="play_arrow" />
            <q-spinner-dots
              v-if="!movie.runtime"
              color="primary"
              size="2em"
            /><span v-else>{{ movie.runtime }} min</span></q-chip
          >
        </q-card-section>
      </q-card>

      <q-card class="info-card" style="max-width: 450px">
        <q-card-section style="opacity: 0.8">
          <div class="text-h6">
            <q-chip square label="IMDb" color="warning" />
            <q-chip
              ><q-avatar color="warning" icon="star_outline" />
              <q-spinner-dots
                v-if="!imdbRating"
                color="primary"
                size="2em"
              /><span v-else>{{ imdbRating }}/10</span></q-chip
            ><q-chip
              ><q-avatar color="warning" icon="person_outline" />
              <q-spinner-dots v-if="!imdbVotes" color="primary" size="2em" />{{
                imdbVotes
              }}</q-chip
            >
          </div>
          <div class="text-h6">
            <q-chip
              square
              label="Rotten Tomatoes"
              text-color="white"
              style="background-color: #fa320a"
            />
            <q-chip
              ><q-avatar
                style="background-color: #fa320a"
                text-color="white"
                icon="star_outline"
              />
              <q-spinner-dots
                v-if="!rottenTomatoesRating"
                color="primary"
                size="2em"
              />{{ rottenTomatoesRating }}</q-chip
            >
          </div>
          <div class="text-h6">
            <q-chip
              square
              label="Metacritic"
              text-color="white"
              style="background-color: #02dede"
            />
            <q-chip
              ><q-avatar
                style="background-color: #02dede"
                text-color="white"
                icon="star_outline"
              />
              <q-spinner-dots
                v-if="!metacriticRating"
                color="primary"
                size="2em"
              />{{ metacriticRating }}</q-chip
            >
          </div>
          <!-- <div class="text-subtitle2">by John Doe</div> -->
        </q-card-section>

        <q-tabs v-model="tab" class="text-primary">
          <q-tab label="Overview" name="overview" />
          <q-tab label="Cast & Crew" name="castAndCrew" />
          <q-tab label="More" name="more" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="overview">
            <q-spinner-dots
              class="absolute-center"
              v-if="!movie.overview"
              color="primary"
              size="2em"
            />
            <q-chip
              square
              dense
              v-for="(genre, index) in movie.genres"
              :key="index"
              :label="genre.name"
            />
            <div class="q-mt-lg">
              <p class="text-justify">{{ movie.overview }}</p>
            </div>
            <div class="note note--red" v-if="movie.tagline">
              <p class="text-bold" style="color: #ec407a">Tagline</p>
              <p>
                {{ movie.tagline }}
              </p>
            </div>
          </q-tab-panel>

          <q-tab-panel name="castAndCrew">
            <div class="q-my-md">
              <q-chip
                square
                outline
                label="Actors"
                color="dark"
                text-color="white"
              />
              <q-chip
                square
                v-for="(actor, index) in actors"
                :key="index + 'a'"
                :label="actor"
              />
            </div>
            <q-separator />
            <div class="q-my-md">
              <q-chip
                square
                outline
                label="Writer/s"
                color="dark"
                text-color="white"
              />
              <q-chip
                square
                v-for="(writer, index) in writers"
                :key="index + 'w'"
                :label="writer"
              />
            </div>
            <q-separator />
            <div class="q-my-md">
              <q-chip
                square
                outline
                label="Director/s"
                color="dark"
                text-color="white"
              />
              <q-chip
                square
                v-for="(director, index) in directors"
                :key="index + 'd'"
                :label="director"
              />
            </div>
          </q-tab-panel>
          <q-tab-panel name="more">
            {{ movieAwards }}
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div></template
>

<script>
export default {
  data() {
    return {
      tab: "overview"
    };
  },
  computed: {
    movie() {
      return this.$store.state.movies.movie;
      console.log(this.$store.state.movies.movie);
    },
    actors() {
      return this.$store.state.movies.movieActors;
    },
    writers() {
      return this.$store.state.movies.movieWriters;
    },
    directors() {
      return this.$store.state.movies.movieDirectors;
    },
    imdbRating() {
      return this.$store.state.movies.imdbRating;
    },
    imdbVotes() {
      return this.$store.state.movies.imdbVotes;
    },
    rottenTomatoesRating() {
      return this.$store.state.movies.rottenTomatoesRating;
    },
    metacriticRating() {
      return this.$store.state.movies.metacriticRating;
    },
    movieAwards() {
      return this.$store.state.movies.movieAwards;
    },
    similarMovies() {
      return this.$store.state.movies.similarMovies;
    }
  },
  mounted() {
    this.$store.dispatch("movies/fetchMovieDetails", this.$route.params["id"]);
  },
  destroyed() {
    this.$store.commit("movies/resetMovie");
  }
};
</script>

<style lang="sass" scoped>
.movie-card
  max-width: 280px
.back-img-mask
  position: fixed;
  background-color: black;
  opacity: 0.8;
.note
  margin: 8px 0
  padding: 8px 12px
  font-size: 1em
  border-color: #9e9e9e
  border-style: solid
  border-width: 0 0 0 5px
  border-color: red;
  letter-spacing: .5px
.note--red
  background-color: #fdedf2
  border-color: #ec407a
</style>
