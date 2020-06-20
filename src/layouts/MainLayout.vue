<template>
  <q-layout view="hHh LpR lfr">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar
            square
            :style="
              moviesTab ? { margin: '15px 0 5px 0' } : { margin: '15px 0' }
            "
          >
            <img src="/statics/icons/favicon-128x128.png" />
          </q-avatar>
        </q-toolbar-title>

        <q-btn
          size="18px"
          dense
          flat
          square
          icon="menu"
          @click="right = !right"
        />
      </q-toolbar>

      <q-tabs align="left" v-model="tab" v-if="moviesTab">
        <q-tab active name="popular" label="Popular" />
        <q-tab name="top_rated" label="Top Rated" />
      </q-tabs>
    </q-header>

    <q-drawer
      :width="400"
      v-model="right"
      side="right"
      elevated
      :no-swipe-close="false"
    >
      <!-- drawer content -->
      <div class="q-my-sm q-mx-md">
        <q-input bottom-slots v-model="searchText" label="Search">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click="searchText = ''"
              class="cursor-pointer"
            />
          </template>
          <template v-slot:after>
            <q-btn round dense flat icon="send" @click="doTheSearch()" />
          </template>
        </q-input>
        <div class="q-ma-sm text-center">
          <q-btn-toggle
            v-model="searchType"
            toggle-color="primary"
            :options="[
              { label: 'Movies', value: 'movie' },
              { label: 'People', value: 'person' },
              { label: 'Multi', value: 'multi' }
            ]"
          />
        </div>
      </div>
      <div class="q-mx-sm q-my-lg">
        <q-chip
          v-for="(result, index) in searchResults"
          :key="index + 'res'"
          :label="result.title"
        />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      right: false,
      tab: "top_rated",
      searchText: ""
    };
  },
  computed: {
    moviesTab() {
      return this.$store.state.movies.moviesTab;
    },
    searchType: {
      get: function() {
        return this.$store.state.movies.searchType;
      },
      set: function(val) {
        this.$store.commit("movies/setSearchType", val);
      }
    },
    searchResults() {
      return this.$store.state.movies.searchResults;
    }
  },
  methods: {
    doTheSearch() {
      this.$store.dispatch("movies/searchApi", this.searchText);
    }
  },
  watch: {
    tab: function(val) {
      this.$store.commit("movies/setMoviesTab", val);
      this.$store.dispatch("movies/fetchMovies", 1).then(() => {
        window.scrollTo(0, 0);
      });
    }
  }
};
</script>
