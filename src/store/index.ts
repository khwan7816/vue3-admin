import { createStore } from "vuex";
import config from "@/config";
import modules from "./modules";
import models from "./models";

const configGetters = {
  config: () => {
    return config;
  },
};

export default createStore({
  modules: {
    ...modules,
    ...models,
  },
  state: {},
  getters: {
    ...configGetters,
  },
  mutations: {},
  actions: {},
});
