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

        <q-btn dense flat square icon="menu" @click="right = !right" />
      </q-toolbar>

      <q-tabs align="left" v-model="tab" v-if="moviesTab">
        <q-tab active name="popular" label="Popular" />
        <q-tab name="top_rated" label="Top Rated" />
        <!-- <q-tab name="trending" label="Trending" /> -->
      </q-tabs>
    </q-header>

    <q-drawer v-model="right" side="right" elevated :width="275">
      <!-- drawer content -->
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
      tab: "top_rated"
    };
  },
  computed: {
    moviesTab() {
      return this.$store.state.movies.moviesTab;
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
