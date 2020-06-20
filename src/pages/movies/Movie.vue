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
      <q-card class="my-card" style="max-width: 280px">
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

      <q-card class="my-card" style="max-width: 450px">
        <q-card-section style="opacity: 0.8">
          <div class="text-h6">
            <q-chip square label="IMDb" color="warning" />
            <q-chip
              ><q-avatar color="warning" icon="star_border" />
              <q-spinner-dots
                v-if="!imdb_rating"
                color="primary"
                size="2em"
              /><span v-else>{{ imdb_rating }}</span></q-chip
            ><q-chip
              ><q-avatar color="warning" icon="person_outline" />
              <q-spinner-dots
                v-if="!imdb_rating_count"
                color="primary"
                size="2em"
              />{{ imdb_rating_count | separateThous }}</q-chip
            >
          </div>
          <!-- <div class="text-subtitle2">by John Doe</div> -->
        </q-card-section>

        <q-tabs v-model="tab" class="text-primary">
          <q-tab label="Overview" name="overview" />
          <q-tab label="Similar" name="similar" />
          <q-tab label="Crew" name="crew" />
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

          <q-tab-panel name="similar">
            <!-- <div class="q-pa-md">
              <q-card
                v-for="(similarMovie, index) in similarMovies"
                :key="index"
                clickable
                style="max-width: 150px"
              >
                <q-img contain :src="similarMovie.poster_path" />
              </q-card>
            </div> -->
          </q-tab-panel>
          <q-tab-panel name="crew">
            With so much content to display at once, and often so little screen
            real-estate, Cards have fast become the design pattern of choice for
            many companies, including the likes of Google and Twitter.
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
  filters: {
    separateThous: function(value) {
      if (!value) return "";
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  computed: {
    movie() {
      return this.$store.state.movies.movie;
      console.log(this.$store.state.movies.movie);
    },
    imdb_rating() {
      return this.$store.state.movies.imdb_rating;
    },
    imdb_rating_count() {
      return this.$store.state.movies.imdb_rating_count;
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
