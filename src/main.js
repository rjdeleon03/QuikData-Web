import Vue from "vue";
import App from "./App.vue";

import router from "./router";

import Material from "materialize-css";
import "materialize-css/dist/css/materialize.css";
import ScrollTo from "vue-scrollto";
Vue.use(Material);
Vue.use(ScrollTo);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
