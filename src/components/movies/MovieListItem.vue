<template>
  <q-card class="movie-card">
    <q-img class="movie-poster" contain :src="poster_path" />

    <q-card-section style="height: 160px">
      <div class="text-overline text-orange-9">
        <span>{{ release_date | releaseDate }}</span>
        <q-chip
          style="float: right; background-color: #90cea1"
          align="right"
          size="11px"
          :label="'TMDB: ' + vote_average"
        />
      </div>
      <div class="text-overline text-orange-7">
        <q-chip
          size="10px"
          square
          v-for="(genre, index) in genre_ids.slice(0, 4)"
          :key="index"
          :label="genres[genre]"
        />
      </div>
      <div class="movie-title q-mt-sm q-mb-xs">
        {{ title | etc }}
        <q-tooltip
          content-style="font-size: 14px"
          anchor="center middle"
          self="center middle"
        >
          {{ title }}
        </q-tooltip>
      </div>
      <div class="text-caption text-grey">
        {{ original_title | etc }}
        <q-tooltip
          content-style="font-size: 14px"
          anchor="center middle"
          self="center middle"
        >
          {{ original_title }}
        </q-tooltip>
      </div>
    </q-card-section>

    <q-card-actions>
      <router-link :to="{ name: 'movie', params: { id: id } }">
        <template v-slot="props">
          <q-btn
            color="black"
            label="VIEW MOVIE"
            flat
            style="width: 190px"
            v-bind="buttonProps(props)"
          />
        </template>
      </router-link>
      <!-- <q-btn :to="'/' + id" flat color="dark" label="view" /> -->
      <!-- <q-btn flat color="primary" label="Book" /> -->

      <q-space />

      <q-btn
        color="grey"
        round
        flat
        dense
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
      />
    </q-card-actions>

    <q-slide-transition>
      <div v-show="expanded">
        <q-separator />
        <q-card-section class="text-subitle2 text-justify">
          {{ overview }}
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script>
export default {
  name: "MovieListItem",
  data() {
    return {
      expanded: false
    };
  },
  filters: {
    etc: function(value) {
      if (!value) return "";
      if (value.length > 22) {
        return value.slice(0, 20) + " ...";
      } else {
        return value;
      }
    },
    releaseDate: function(value) {
      if (!value) return "";
      const year = value.slice(0, 4);
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
      ];
      let monthNumber = value.slice(5, 7);
      if (monthNumber.slice(0, 1) === "0") {
        monthNumber = monthNumber.slice(1, 2);
      }
      const month = months[Number(monthNumber) - 1];
      return year + " - " + month;
    }
  },
  computed: {
    genres() {
      return this.$store.state.movies.genres;
    }
  },
  methods: {
    buttonProps({ href, route, isActive, isExactActive }) {
      return {
        to: href
      };
    }
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    id: {
      type: Number,
      default: 0
    },
    original_language: {
      type: String,
      default: ""
    },
    original_title: {
      type: String,
      default: ""
    },
    genre_ids: {
      type: Array,
      default: function() {
        return [];
      }
    },
    overview: {
      type: String,
      default: ""
    },
    release_date: {
      type: String,
      default: ""
    },
    poster_path: {
      type: String,
      default: ""
    },
    vote_average: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="sass" scoped>
.movie-card
  width: 100%
  max-width: 245px
  // .movie-poster
  //   height: 325px

.movie-title
  font-size: 14px
  font-weight: bold

@media only screen and (max-width: 414px)
  .movie-card
    max-width: 100%

@media only screen and (max-width: 768px) and (min-width: 414px)
  .movie-card
    max-width: 330px
    // .movie-poster
    //   height: 430px
</style>
