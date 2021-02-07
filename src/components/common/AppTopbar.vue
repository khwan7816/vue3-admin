<template>
  <div class="layout-topbar">
    <a class="menu-button" @click="$emit('menubutton-click')">
      <i class="pi pi-bars"></i>
    </a>

    <router-link to="/" class="logo">
      <span>Vue3-admin</span>
    </router-link>

    <ul ref="topbarMenu" class="topbar-menu">
      <li><router-link to="/setup">Get Started</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  watch: {},
  props: {
    theme: null,
  },
  data() {
    return {
      activeMenuIndex: null,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.layout-topbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: $topbar;
  display: flex;
  align-items: center;
  padding: 0 unit(3.5);
  width: 100%;
  height: unit(7);
  background-color: var(--surface-a);
  box-shadow: 0 0 unit(0.4) rgba(0, 0, 0, 0.25);
  border-bottom: 1px solid var(--surface-d);

  .menu-button {
    display: none;
    color: var(--text-color);
    width: unit(7);
    height: unit(7);
    line-height: unit(7);
    text-align: center;
    transition: background-color 0.2s;
    cursor: pointer;

    &:hover {
      background-color: var(--surface-c);
    }

    i {
      font-size: unit(2.4);
      line-height: inherit;
    }
  }

  .logo {
    span {
      color: var(--primary-color);
    }

    /* img {
      width: unit(1.8);
    } */

    &:focus {
      outline: 0 none;
      transition: box-shadow 0.2s;
      box-shadow: 0 0 0 0.2rem $focusBorderColor;
    }
  }

  .topbar-menu {
    list-style-type: none;
    display: flex;
    margin: 0;
    margin-left: auto;
    padding: 0;
    height: 100%;

    > li {
      height: unit(7);
      line-height: unit(7);

      > a {
        display: block;
        min-width: unit(12);
        line-height: unit(6.8);
        color: var(--text-color);
        font-size: unit(1.6);
        text-decoration: none;
        text-align: center;
        user-select: none;
        border-bottom: 2px solid transparent;
        transition: border-bottom-color 0.2s;
        cursor: pointer;

        &:hover,
        &:focus {
          border-bottom-color: var(--primary-color);
        }

        &:focus {
          z-index: 1;
          outline: 0 none;
          transition: box-shadow 0.2s;
          box-shadow: inset 0 0 0 0.2em $focusBorderColor;
        }
      }

      &.topbar-submenu {
        position: relative;

        > ul {
          position: absolute;
          top: unit(7);
          right: 0;
          margin: 0;
          padding: unit(1.6);
          width: unit(27.5);
          max-height: unit(40);
          background-color: var(--surface-f);
          box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
            0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
          overflow: auto;
          list-style-type: none;
          border-radius: unit(0.3);
          transform-origin: top;

          > li {
            line-height: 1;

            &.topbar-submenu-header {
              display: block;
              padding: unit(1.5) 0 unit(1) 0;
              color: var(--text-color-secondary);
              font-size: unit(1);
              font-weight: 600;
              user-select: none;
              text-transform: uppercase;

              &:first-child {
                padding-top: 1rem;
              }
            }
          }

          a {
            display: flex;
            align-items: center;
            padding: unit(0.5);
            color: var(--text-color);
            user-select: none;
            border-radius: unit(0.3);
            text-decoration: none;
            cursor: pointer;

            &:hover {
              background-color: var(--surface-c);
            }

            span {
              margin-left: unit(0.5);
            }

            i {
              font-size: unit(1.8);
              color: var(--text-color-secondary);
            }

            img {
              width: unit(3.2);
              margin-right: unit(0.5);
            }
          }
        }
      }
    }
  }
}

@include lg {
  .layout-topbar {
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0;
    height: unit(1.1);

    .menu-button {
      display: block;
    }

    .logo {
      img {
        width: unit(15);
      }
    }

    .topbar-menu {
      margin: 0;
      width: 100%;
      height: unit(4);
      border-top: 1px solid var(--surface-d);
      background-color: var(--surface-a);

      > li {
        height: unit(4);
        line-height: unit(4);
        width: 25%;

        > a {
          padding-bottom: 0;
          height: unit(4);
          line-height: unit(3.8);
          width: 100%;
          font-size: unit(1.4);
          min-width: auto;
        }

        &.topbar-submenu > ul {
          top: unit(4);
        }
      }
    }
  }
}

@include sm {
  .layout-wrapper.layout-news-active {
    .topbar-menu {
      > li {
        &.topbar-submenu {
          > ul {
            top: unit(18);
          }
        }
      }
    }
  }

  .layout-topbar {
    .topbar-menu {
      > li {
        &.topbar-submenu {
          position: static;

          > ul {
            position: fixed;
            top: unit(11);
            right: auto;
            left: 0;
            width: 100vw;
          }
        }
      }
    }
  }
}
</style>
