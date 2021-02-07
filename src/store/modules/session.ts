import { Module, GetterTree, MutationTree, ActionTree } from "vuex";
import { RootState } from "@/store/types";
import { SessionState } from "@/store/types/session.types";

import http from "@/plugins/axios";

const __ACCESS_TOKEN__ = "__ACCESS_TOKEN__";

export const getAccessToken = (): string => {
  return localStorage.getItem(__ACCESS_TOKEN__) || "";
};

const state: SessionState = {
  accessToken: getAccessToken(),
  profile: {},
};

const getters: GetterTree<SessionState, RootState> = {
  accessToken(state): string {
    return state.accessToken;
  },
};

const mutations: MutationTree<SessionState> = {
  SET_ACCESS_TOKEN(state, payload) {
    state.accessToken = payload.token;

    localStorage.setItem(__ACCESS_TOKEN__, state.accessToken);

    http.setAccessToken(state.accessToken);
  },
  SET_PROFILE(state, payload) {
    state.profile = { ...payload };
  },
};

const actions: ActionTree<SessionState, RootState> = {
  async guest({ commit }, options): Promise<any> {
    try {
      const data = await http.post("/v1/members/guest", { ...options });

      const { item } = data;

      commit("SET_ACCESS_TOKEN", item.access_token);
      commit("SET_PROFILE", item);

      return data;
    } catch (e) {
      console.error(e);
    }
  },
};

const store: Module<SessionState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default store;
