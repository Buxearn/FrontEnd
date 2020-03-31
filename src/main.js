import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faSignInAlt,
  faClock,
  faMoneyBill,
  faMoneyCheckAlt,
  faUser,
  faGift,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faBars,
  faSignInAlt,
  faClock,
  faMoneyBill,
  faMoneyCheckAlt,
  faUser,
  faGift,
  faDiscord,
  faTasks
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

// Vue.prototype.$apiHostname = 'http://localhost:3000'
Vue.prototype.$apiHostname = "https://api.buxearn.com";

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
