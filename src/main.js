import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "papercss/docs/static/assets/paper.min.css";

new Vue({
  router,
  store,
  el: "#app",
  render: h => h(App)
});
