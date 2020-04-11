<template>
  <div id="app">
    <app-navigation></app-navigation>
    <router-view />
    <app-modal></app-modal>
  </div>
</template>

<script>
import Navigation from "./components/Navigation/Navigation.vue";
import Modal from "./components/Navigation/Modal.vue";

export default {
  components: {
    appNavigation: Navigation,
    appModal: Modal
  },
  name: "app",
  computed: {
    showModalType() {
      return this.$store.state.showModalType;
    }
  }
};
</script>

<style lang="scss">
a {
  background-image: none;
}

section {
  background-color: #f2f1f2;
  z-index: 0;
  margin-top: 75px;
  height: 100vh;
  width: 100vw;
  display: table;
}

@media (min-width: 769px) {
  section {
    margin-top: 125px;
  }
}

@media (min-width: 1000px) {
  section {
    margin-top: 0;
    margin-left: 20%;
    width: 80%;
  }
}
</style>
