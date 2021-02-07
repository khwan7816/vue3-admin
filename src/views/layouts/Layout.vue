<template>
  <div id="wrapper" class="layout-wrapper" :class="pageClassNames">
    <app-topbar @menubutton-click="onMenuButtonClick" :theme="theme" />

    <app-menu :active="sidebarActive" />

    <div class="layout-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppTopbar from "@/components/common/AppTopbar";
import AppMenu from "@/components/common/AppMenu";

export default {
  data() {
    return {
      sidebarActive: false,
      theme: "luna-pink",
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

    onMenuButtonClick() {
      console.log(12341234);
    },
  },
  components: {
    AppTopbar,
    AppMenu,
  },
};
</script>
