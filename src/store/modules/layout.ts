import { Module, GetterTree, MutationTree, ActionTree } from "vuex";
import { RootState } from "@/store/types";
import { LayoutState } from "@/store/types/layout.types";

const LAYOUT_MODE = {
  UNSET: "unset",
  DESKTOP: "desktop",
  TABLET: "tablet",
  MOBILE: "mobile",
};

const state: LayoutState = {
  scrollX: window.scrollX,
  scrollY: window.scrollY,
  scrollStatus: "unset",
  scrollPosition: "top",
  layoutMode: LAYOUT_MODE.UNSET,

  clientWidth: 0,
};

const getters: GetterTree<LayoutState, RootState> = {
  headerHeight(): number {
    const header = document.getElementById("header") || { clientHeight: 0 };
    return header.clientHeight;
  },
  layoutMode(state): string {
    return state.layoutMode;
  },
  scrollY(state): number {
    return state.scrollY;
  },
  scrollStatus(state): string {
    return state.scrollStatus;
  },
  scrollPosition(state): string {
    return state.scrollPosition;
  },
};

const mutations: MutationTree<LayoutState> = {
  SET_LAYOUT_MODE(state, { layoutMode }) {
    state.layoutMode = layoutMode;
  },
  SET_SCROLL_POSITION(state, { scrollPosition }) {
    state.scrollPosition = scrollPosition;
  },
  SET_SCROLL_STATUS(state, { scrollStatus }) {
    state.scrollStatus = scrollStatus;
  },
  RESIZE(state) {
    const width = document.body.clientWidth || 0;
    let layoutMode = LAYOUT_MODE.DESKTOP;

    if (width < 768) {
      layoutMode = LAYOUT_MODE.MOBILE;
    } else if (width < 1024) {
      layoutMode = LAYOUT_MODE.TABLET;
    }

    if (state.clientWidth !== width) {
      state.clientWidth = width;
    }

    if (state.layoutMode !== layoutMode) {
      state.layoutMode = layoutMode;
    }
  },
};

const actions: ActionTree<LayoutState, RootState> = {
  scroll({ commit, state }) {
    state.scrollX = window.scrollX;
    state.scrollY = window.scrollY;

    commit("SET_SCROLL_POSITION", {
      scrollPosition: state.scrollY === 0 ? "top" : "",
    });
  },
  resize({ commit }, options) {
    commit("RESIZE", options);
  },
  setScrollStatus({ commit }, options) {
    commit("SET_SCROLL_STATUS", options);
  },
  setBodyScroll(context, options) {
    document.body.style.overflow = options;
  },
};

const store: Module<LayoutState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default store;
