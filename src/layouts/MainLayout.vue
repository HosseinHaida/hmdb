<template>
  <q-layout view="hHh LpR lfr">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <router-link to="./">
            <q-avatar
              square
              :style="
                moviesTab ? { margin: '15px 0 5px 0' } : { margin: '15px 0' }
              "
            >
              <img src="/statics/icons/favicon-128x128.png" /> </q-avatar
          ></router-link>
        </q-toolbar-title>

        <q-btn
          size="18px"
          dense
          flat
          square
          icon="menu"
          @click="drawerCollapseStatus = !drawerCollapseStatus"
        />
      </q-toolbar>

      <q-tabs align="left" v-model="tab" v-if="moviesTab">
        <q-tab active name="popular" label="Popular" />
        <q-tab name="top_rated" label="Top Rated" />
      </q-tabs>
    </q-header>

    <q-drawer
      :width="drawerWidth"
      v-model="drawerCollapseStatus"
      side="right"
      elevated
      :no-swipe-close="false"
    >
      <!-- drawer content -->
      <div class="q-my-sm q-mx-md">
        <q-input
          debounce="300"
          bottom-slots
          v-model="searchText"
          label="Search"
          @input="doTheSearch"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click="clearTextSearch"
              class="cursor-pointer"
            />
          </template>
          <template v-slot:after>
            <!-- <q-btn round dense flat icon="send" @click="doTheSearch()" /> -->
            <q-spinner-ios v-if="searchResultsFetching" color="primary" />
          </template>
        </q-input>
        <div class="q-ma-sm text-center">
          <q-btn-toggle
            v-model="searchType"
            toggle-color="primary"
            :options="[
              { label: 'Titles', value: 'movie' },
              { label: 'People', value: 'person' }
            ]"
          />
        </div>
      </div>
      <div class="q-mx-sm q-my-lg">
        <div class="note note--warning" v-if="noSearchResults">
          <!-- <p class="text-bold">!</p> -->
          <p style="color: #684e06">
            No Search Results!
          </p>
        </div>
        <q-list padding>
          <q-item
            :clickable="result.title ? true : false"
            v-for="(result, index) in searchResults"
            :key="index + 'i'"
            :to="
              result.title ? { name: 'movie', params: { id: result.id } } : ''
            "
          >
            <q-item-section top avatar>
              <q-avatar size="65px" rounded>
                <q-icon
                  v-if="
                    ((result.title || (result.name && result.overview)) &&
                      !result.poster_path) ||
                      (result.known_for && !result.profile_path)
                  "
                  style="color: #cacaca"
                  name="blur_on"
                  size="60px"
                />
                <q-img
                  native-context-menu
                  :src="
                    result.profile_path
                      ? result.profile_path
                      : result.poster_path
                  "
                />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{
                result.title ? result.title : result.name
              }}</q-item-label>
              <q-item-label caption
                ><span v-if="result.title"
                  ><q-chip
                    v-for="(genreId, index) in result.genre_ids.slice(0, 4)"
                    :key="index + 'g'"
                    square
                    :label="genres[genreId]"
                    dense
                    size="13px"
                /></span>
                <span v-if="result.known_for"
                  ><q-chip
                    :clickable="item.title ? true : false"
                    @click="search(item.title)"
                    v-for="(item, index) in result.known_for"
                    :key="index + 'kf'"
                    :label="item.title ? item.title : item.name"
                    square
                    size="13px"
                    dense/></span
              ></q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption
                ><q-chip
                  size="13px"
                  square
                  dense
                  color="warning"
                  :label="
                    result.release_year
                      ? result.release_year
                      : result.known_for_department
                  "
              /></q-item-label>
              <q-item-label v-if="result.title" caption>
                <q-chip
                  square
                  outline
                  size="13px"
                  dense
                  :label="result.original_language"
                />
              </q-item-label>
              <q-item-label v-if="result.known_for"
                ><q-btn
                  text-color="dark"
                  flat
                  dense
                  icon="subject"
                  @click="findPerson(result.id)"
              /></q-item-label>
            </q-item-section>
          </q-item>
          <q-dialog v-model="showPerson"
            ><q-card style="min-width: 300px">
              <q-img
                contain
                :src="
                  queriedPerson.profile_path
                    ? queriedPerson.profile_path
                    : 'statics/placeholder_img.jpg'
                "
              />
              <div
                class="text-h5 absolute-top text-center"
                style="background-color: #ffffff7f; padding: 15px 0"
              >
                <div>{{ queriedPerson.name }}</div>
              </div>
              <q-card-section>
                <div
                  class="text-overline text-orange-9"
                  style="font-size: 15px"
                >
                  <div class="text-h6">
                    <q-chip
                      square
                      label="Birthday"
                      text-color="white"
                      color="accent"
                    />
                    <q-chip
                      ><q-avatar
                        color="accent"
                        text-color="white"
                        icon="cake"
                      />
                      {{ queriedPerson.birthday | date }}</q-chip
                    ><q-chip
                      v-if="queriedPerson.birthday"
                      :label="
                        calcAge(
                          queriedPerson.birthday,
                          queriedPerson.deathday
                        ) + ' Years'
                      "
                      color="warning"
                    />
                  </div>
                  <div class="text-h6" v-if="queriedPerson.deathday">
                    <q-chip
                      square
                      label="Deathday"
                      text-color="white"
                      color="dark"
                    />
                    <q-chip
                      ><q-avatar
                        color="dark"
                        text-color="white"
                        icon="brightness_3"
                      />
                      {{ queriedPerson.deathday | date }}</q-chip
                    >
                  </div>
                </div>
                <div
                  class="text-caption text-justify q-py-lg"
                  style="font-size: 13px"
                >
                  {{ queriedPerson.biography }}
                </div>
                <div class="q-ma-md" align="center">
                  <a
                    style="text-decoration: none"
                    v-if="queriedPerson.homepage"
                    :href="queriedPerson.homepage"
                    ><q-btn icon="home" color="primary" label="Homepage"
                  /></a>
                </div>
                <div v-if="queriedPerson.also_known_as">
                  <div v-if="queriedPerson.also_known_as.length > 0">
                    <div class="text-h6 q-pt-md q-pl-sm">
                      Also known as:
                    </div>
                    <div class="q-pt-md">
                      <q-chip
                        v-for="(nickname, index) in queriedPerson.also_known_as"
                        :key="index + 'nickname'"
                        square
                        :label="nickname"
                      />
                    </div>
                  </div>
                </div>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn dense icon="close" color="accent" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-list>
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
      tab: "top_rated",
      showPerson: false,
      drawerWidth: window.innerWidth < 500 ? 320 : 420
    };
  },
  filters: {
    date: function(value) {
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
      return year + " " + month + " " + value.slice(8, 10);
    }
  },
  computed: {
    drawerCollapseStatus: {
      get: function() {
        return this.$store.state.movies.drawerCollapseStatus;
      },
      set: function(val) {
        this.$store.commit("movies/setDrawerStatus", val);
      }
    },
    searchText: {
      get: function() {
        return this.$store.state.movies.searchText;
      },
      set: function(val) {
        this.$store.commit("movies/setSearchText", val);
      }
    },
    moviesTab() {
      return this.$store.state.movies.moviesTab;
    },
    genres() {
      return this.$store.state.movies.genres;
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
    },
    searchResultsFetching() {
      return this.$store.state.movies.searchResultsFetching;
    },
    noSearchResults() {
      return this.$store.state.movies.noSearchResults;
    },
    queriedPerson() {
      return this.$store.state.movies.queriedPerson;
    }
  },
  methods: {
    clearTextSearch() {
      this.searchText = "";
      this.$store.commit("movies/setSearchResults", {});
    },
    doTheSearch() {
      if (!this.searchText) {
        this.$store.commit("movies/setSearchResults", {});
      } else {
        this.$store.dispatch("movies/searchApi");
      }
    },
    windowResizeHandler(e) {
      this.drawerWidth = window.innerWidth < 500 ? 320 : 420;
    },
    search(movie) {
      this.$store.commit("movies/setDrawerStatus", true);
      this.$store.commit("movies/setSearchText", movie);
      this.$store.commit("movies/setSearchType", "movie");
      this.$store.dispatch("movies/searchApi");
    },
    async findPerson(id) {
      await this.$store.dispatch("movies/findPerson", id);
      this.showPerson = true;
    },
    calcAge(bd, dd) {
      const bdy = bd.slice(0, 4);
      let ddy;
      if (dd) {
        ddy = dd.slice(0, 4);
        return ddy - bdy;
      } else {
        const currentYear = new Date(Date.now()).getFullYear();
        return currentYear - bdy;
      }
    }
  },
  watch: {
    tab: function(val) {
      this.$store.commit("movies/setMoviesTab", val);
      this.$store.dispatch("movies/fetchMovies", 1).then(() => {
        window.scrollTo(0, 0);
      });
    }
  },
  mounted() {
    this.$store.dispatch("movies/fetchGenres");
  },
  created() {
    window.addEventListener("resize", this.windowResizeHandler);
  }
};
</script>

<style lang="sass" scoped></style>
