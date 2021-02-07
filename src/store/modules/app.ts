import { Module, GetterTree, MutationTree, ActionTree } from "vuex";
import { RootState } from "@/store/types";
import { AppState } from "@/store/types/app.types";

import http from "@/plugins/axios";

const __FIRST_OPEN__ = "__FIRST_OPEN__";
const MODE = {
  UNSET: "UNSET",
  LAUNCHING: "LAUNCHING",
  CONTINUE: "CONTINUE",
  READY: "READY",
  LAUNCHED: "LAUNCHED",
  SHUTDOWN: "SHUTDOWN",
  NETWORK: "NETWORK",
};

const state: AppState = {
  // 앱 초기화 관련
  mode: MODE.UNSET,
  initialized: false,

  // 앱 최초 시작 여부
  firstOpened: !!localStorage.getItem(__FIRST_OPEN__),
};

const getters: GetterTree<AppState, RootState> = {
  initialized(state): boolean {
    return state.initialized;
  },
  mode(state): string {
    return state.mode;
  },
  firstOpened(state): boolean {
    return state.firstOpened;
  },
};

const mutations: MutationTree<AppState> = {
  INITIALIZE(state) {
    state.initialized = true;
  },
  SET_MODE(state, payload) {
    state.mode = payload.mode;
  },
  FIRST_OPEN(state, payload) {
    const { firstOpened } = payload;

    if (firstOpened) {
      localStorage.setItem(__FIRST_OPEN__, new Date().toString());
      state.firstOpened = true;
    }
  },
};

const actions: ActionTree<AppState, RootState> = {
  async initialize({ commit }): Promise<any> {
    try {
      const url = "/v1/app/initialize";
      const data = await http.get(url, { params: {} });

      commit("INITIALIZE", data);
      return data;
    } catch (e) {
      console.error(e);
    }
  },

  setMode({ commit }, options) {
    commit("SET_MODE", options);
  },

  firstOpen({ commit }) {
    commit("FIRST_OPEN", { firstOpened: true });
  },

  clearCache() {
    localStorage.removeItem(__FIRST_OPEN__);
  },
};

const store: Module<AppState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default store;
