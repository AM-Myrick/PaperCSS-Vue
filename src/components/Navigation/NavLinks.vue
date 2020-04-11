<template>
  <div @click="$store.commit('closeMenus')" :class="defineClassNames()">
    <!-- <div :class="defineClassNames()" @click="closeMenu"> -->
    <router-link class="nav-button" to="/">View Notes</router-link>
    <router-link class="nav-button" to="/add-note">Add Note</router-link>
    <template v-if="token">
      <!-- <router-link class="nav-button" to="/" @click="logout"
        >Logout</router-link
      > -->
      <div @click="logout" class="nav-button">Logout</div>
    </template>
    <template v-else>
      <!-- <div class="nav-button" @click="showRegisterModal">Register</div>
      <div class="nav-button" @click="showLoginModal">Login</div> -->
      <div
        class="nav-button"
        @click.stop="$store.commit('setModalType', { modalType: 'Register' })"
      >
        Register
      </div>
      <div
        class="nav-button"
        @click.stop="$store.commit('setModalType', { modalType: 'Login' })"
      >
        Login
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    width: Number
  },
  computed: {
    token() {
      return this.$store.state.token;
    }
  },
  methods: {
    defineClassNames() {
      return this.width <= 768
        ? "collapsible-body btn-container"
        : "btn-container";
    },
    logout() {
      this.$store.commit("logout");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../mixins.scss";

// fixed and sidebar nav styles
nav .btn-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 150px;

  .nav-button {
    @include button-styles;
    width: 100%;
    font-size: 1.2rem;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

/* fixed navigation styles (320px - 999px) */
nav.fixed .btn-container {
  width: 100%;
  align-items: center;
  flex-wrap: nowrap;
  margin-bottom: 0;

  .nav-button {
    height: 75px;
    margin: 1%;
    margin-bottom: 0;
    width: 33%;
    text-align: center;
  }
}

@media (max-width: 768px) {
  nav.fixed .collapsible-body.btn-container {
    flex-direction: column;
    align-items: flex-end;

    a:first-of-type {
      margin-top: 25px;
    }
  }
}
</style>
