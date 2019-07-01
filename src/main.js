import Vue from "vue";
import App from "./App.vue";

import router from "./router";

import Material from "materialize-css";
import "materialize-css/dist/css/materialize.css";
import "materialize-css/dist/js/materialize.min.js";
Vue.use(Material);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
