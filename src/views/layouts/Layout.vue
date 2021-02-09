<template>
  <div id="wrapper" class="layout-wrapper" :class="pageClassNames">
    <app-topbar @menubutton-click="onClickMenuButton" />

    <app-menu :active="sidebarActive" />

    <div
      class="layout-mask"
      :class="{ 'layout-mask-active': sidebarActive }"
      @click="onClickMask"
    ></div>

    <div class="layout-content">
      <router-view v-slot="{ Component }" :key="$route.fullPath">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import AppTopbar from "@/components/common/AppTopbar";
import AppMenu from "@/components/common/AppMenu";

import DomHandler from "@/utils/DomHandler";

export default {
  data() {
    return {
      sidebarActive: false,
    };
  },
  computed: {
    scrollY() {
      return this.$store.getters["layout/scrollY"];
    },
    scrollStatus() {
      return this.$store.getters["layout/scrollStatus"];
    },
    scrollRoofTop() {
      return this.scrollY <= 0;
    },
    scrollContentTop() {
      return this.scrollY <= this.headerHeight;
    },
    headerHeight() {
      return this.$store.getters["layout/headerHeight"];
    },
    pageClassNames() {
      return {
        "scroll-roof-top": this.scrollRoofTop,
        "scroll-top": this.scrollContentTop,
        "scroll-unset": this.scrollStatus === "unset",
        "scroll-up": this.scrollStatus === "scroll-up",
        "scroll-down": this.scrollStatus === "scroll-down",
        "scroll-content": !this.scrollContentTop,
      };
    },
  },
  watch: {
    scrollY(value, oldValue) {
      const diffY = oldValue - value;
      let scrollStatus = this.scrollStatus;

      if (Math.abs(diffY) > 5) {
        if (diffY > 0) {
          scrollStatus = "scroll-up";
        } else if (diffY < 0) {
          scrollStatus = "scroll-down";
        }

        this.setScrollStatus(scrollStatus);
      }
    },
  },
  methods: {
    setScrollStatus(scrollStatus) {
      if (this.scrollStatus !== scrollStatus) {
        this.$store.dispatch("layout/setScrollStatus", { scrollStatus });
      }
    },

    setUseStickyHeader(useStickyHeader) {
      if (this.useStickyHeader !== useStickyHeader) {
        this.$store.dispatch("layout/setUseStickyHeader", {
          useStickyHeader,
        });
      }
    },

    onClickMenuButton() {
      if (this.$data.sidebarActive) {
        this.$data.sidebarActive = false;
        DomHandler.removeClass(document.body, "blocked-scroll");
      } else {
        this.$data.sidebarActive = true;
        DomHandler.addClass(document.body, "blocked-scroll");
      }
    },

    onClickMask() {
      this.$data.sidebarActive = false;
      DomHandler.removeClass(document.body, "blocked-scroll");
    },
  },
  components: {
    AppTopbar,
    AppMenu,
  },
};
</script>
