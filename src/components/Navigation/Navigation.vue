<template>
  <nav :class="width >= 1000 ? null : 'fixed'">
    <h1>
      <router-link to="/">Paper Notes</router-link>
    </h1>
    <div v-if="width < 769" class="collapsible">
      <input id="collapsible1" type="checkbox" name="collapsible1" />
      <button>
        <label for="collapsible1">
          <div class="bar1"></div>
          <div class="bar2"></div>
          <div class="bar3"></div>
        </label>
      </button>
      <app-nav-links :width="width"></app-nav-links>
    </div>
    <app-nav-links v-else :width="width"></app-nav-links>
  </nav>
</template>

<script>
import debounce from "lodash/debounce";
import NavLinks from "./NavLinks.vue";

export default {
  components: {
    appNavLinks: NavLinks
  },
  data() {
    return {
      width: window.innerWidth
    };
  },
  methods: {
    updateWidth() {
      this.width = window.innerWidth;
    }
  },
  mounted() {
    window.onresize = debounce(this.updateWidth, 100);
  }
};
</script>

<style lang="scss" scoped>
/* fixed & sidebar nav styles */
nav h1 {
  color: #414141;
  font-size: 2.4rem;
  margin-left: 8%;
  margin-top: 3%;
  margin-bottom: 10%;
  line-height: 1;

  a {
    border: none;

    &:hover {
      border: none;
    }
  }
}

/* fixed navigation styles (320px - 999px) */
nav.fixed {
  height: 125px;
  background-color: #d3d2d3;
  border: 1px solid black;

  h1 {
    margin: 0;
  }
}

@media (max-width: 768px) {
  nav.fixed {
    height: 75px;
  }
}

/* sidebar navigation styles (1000px+) */

@media (min-width: 1000px) {
  nav {
    width: 20%;
    height: 100vh;
    background-color: #d3d2d3;
    border: 1px solid black;
    position: fixed;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
