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
    ],
  },
];

export default routes;
