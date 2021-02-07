<template>
  <div id="app-container" :class="appClassNames">
    <router-view />
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const mode = store.getters.config.mode;
    const appClassNames = computed(() => {
      return {
        debug: mode === "debug",
        staging: mode === "staging",
      };
    });

    const token = computed(() => {
      return store.getters["session/accessToken"];
    });

    const postGuest = async () => {
      const data = await store.dispatch("session/guest");
    };

    if (!token.value) {
      // postGuest();
    } else {
      store.commit("session/SET_ACCESS_TOKEN", { token: token.value });
    }

    return {
      appMode: process.env.VUE_APP_MODE,
      appClassNames,
    };
  },
};
</script>

<style lang="scss"></style>
