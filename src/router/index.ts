import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import routesRecords from "./routes";

const routes: RouteRecordRaw[] = routesRecords;

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.hash) {
    if (from && from.name === to.name && from.path === to.path) {
      next(false);
      return;
    }
  }

  next();
});

export default router;
