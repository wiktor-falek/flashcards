import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import SigninView from "./views/SigninView.vue";
import PractiseView from "./views/PractiseView.vue";
import BrowseView from "./views/BrowseView.vue";

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
      // component: () => import("./views/SigninView.vue")
    },
    {
      path: "/browse",
      name: "browse",
      component: BrowseView,
    },
    {
      path: "/practise",
      name: "practise",
      component: PractiseView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      // component: NotFound,
    },
  ],
});

export default router;
