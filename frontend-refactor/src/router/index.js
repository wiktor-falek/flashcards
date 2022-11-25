import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SigninView from "../views/SigninView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/signin",
      name: "signin",
      component: SigninView,
    },
  ],
});

export default router;
