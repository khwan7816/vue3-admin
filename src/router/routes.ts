import { RouteRecordRaw } from "vue-router";

import Layout from "@/views/layouts/Layout.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Layout,
    redirect: { name: "Main" },
    children: [
      {
        path: "main",
        component: () => import("@/views/pages/main/Main.vue"),
        name: "Main",
        meta: { title: "Main" },
      },
      {
        path: "page1",
        component: () => import("@/views/pages/sample/Page1.vue"),
        name: "Page1",
        meta: { title: "Page1" },
      },
      {
        path: "page2",
        component: () => import("@/views/pages/sample/Page2.vue"),
        name: "Page2",
        meta: { title: "Page2" },
      },
    ],
  },
];

export default routes;
