import "@/assets/scss/styles.scss";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import plugins from "./plugins";

import "./registerServiceWorker";

createApp(App)
  .use(store)
  .use(router)
  .use(plugins)
  .mount("#app");
