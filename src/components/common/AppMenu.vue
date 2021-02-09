<template>
  <div :class="['layout-sidebar', { active: active }]">
    <div class="layout-menu">
      <template v-for="item of menu" :key="item.title">
        <div class="menu-category">{{ item.title }}</div>
        <div class="menu-items">
          <template v-for="child of item.children" :key="child.title">
            <!-- 외부링크 -->
            <a v-if="child.href" :href="child.href" target="_blank">
              {{ child.title }}
            </a>

            <!-- 내부링크 -->
            <router-link v-if="child.to" :to="{ name: child.name }">
              {{ child.title }}
              <!-- <Tag v-if="child.badge" :value="child.badge" /> -->
            </router-link>

            <!-- <template v-if="child.children">
              <router-link
                :to="child.children[0].to"
                v-slot="{ isActive }"
                custom
              >
                <div>
                  <a tabindex="0" @click="toggleSubmenu($event, child.meta[0])">
                    {{ child.name }}
                  </a>
                  <transition name="p-toggleable-content">
                    <div
                      class="p-toggleable-content"
                      v-show="isSubmenuActive(child.meta[0], isActive)"
                    >
                      <ul>
                        <li v-for="(submenuitem, i) of child.children" :key="i">
                          <router-link :to="submenuitem.to">
                            {{ submenuitem.name }}
                          </router-link>
                        </li>
                      </ul>
                    </div>
                  </transition>
                </div>
              </router-link>
            </template> -->
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: Boolean,
  },
  data() {
    return {
      activeSubmenus: {},
      menu: [
        {
          title: "그룹제목",
          children: [
            {
              title: "Page 1",
              to: "/page1",
              name: "Page1",
              meta: "",
            },
            {
              title: "Page 2",
              to: "/page2",
              name: "Page2",
              meta: "",
            },
            {
              title: "외부링크(네이버)",
              href: "https://naver.com",
              meta: "",
            },
          ],
        },
      ],
    };
  },
  methods: {
    toggleSubmenu(event, name) {
      this.activeSubmenus[name] = this.activeSubmenus[name] ? false : true;
      this.activeSubmenus = { ...this.activeSubmenus };
      event.preventDefault();
    },
    isSubmenuActive(name, routerIsActive) {
      if (this.activeSubmenus[name]) {
        return true;
      } else if (routerIsActive) {
        this.activeSubmenus[name] = true;
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-sidebar {
  position: fixed;
  left: 0;
  top: unit(7);
  padding: unit(1.6);
  width: unit(25);
  height: calc(100% - #{unit(7)});
  background-color: var(--surface-a);
  border-right: 1px solid var(--surface-d);
  overflow: auto;
  user-select: none;
  transition: transform 0.4s cubic-bezier(0.05, 0.74, 0.2, 0.99);

  .layout-menu {
    .menu-category {
      display: block;
      padding: unit(2) 0 unit(1.6) 0;
      color: var(--text-color-secondary);
      font-size: unit(1);
      font-weight: 600;
      user-select: none;
      text-transform: uppercase;
      border-top: 1px solid var(--surface-d);

      &:first-child {
        border-top: 0 none;
        padding-top: unit(1.6);
      }
    }

    .menu-items {
      padding: 0 0 unit(1) 0;
      display: flex;
      flex-direction: column;

      a {
        display: flex;
        align-items: center;
        padding: unit(1);
        color: var(--text-color);
        border-radius: unit(0.3);
        cursor: pointer;

        &:hover {
          background-color: var(--surface-c);
        }

        &:focus {
          z-index: 1;
          outline: 0 none;
          transition: box-shadow 0.2s;
          box-shadow: 0 0 0 0.2em $focusBorderColor;
        }

        &.router-link-exact-active {
          color: var(--primary-color);
          font-weight: 700;
        }

        .p-tag {
          padding-top: 0.125rem;
          padding-bottom: 0.125rem;
          margin-left: 0.5rem;
        }
      }

      div {
        &.router-link-exact-active {
          > a {
            font-weight: 700;
          }

          ul {
            display: block;
          }
        }

        ul {
          padding: unit(0.5) 0;
          margin: 0;
          list-style-type: none;

          a {
            font-size: 0.875rem;
            padding: 0.475rem 0.5rem 0.475rem 2rem;
          }
        }
      }
    }
  }
}

@include lg {
  .layout-sidebar {
    top: 0;
    z-index: 999;
    height: 100%;
    transform: translateX(-100%);

    &.active {
      transform: translateX(0);
    }
  }
}
</style>
