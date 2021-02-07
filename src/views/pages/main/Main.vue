<template>
  <div class="page main">
    <!-- <Header logo right-item="search" /> -->

    <div class="page-content">
      123123
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();

    const actions = {};

    return {
      ...actions,
    };
  },
  components: {},
};
</script>
