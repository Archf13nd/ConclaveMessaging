import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Settings from "./pages/Settings.vue";
import ChangeDetails from "./components/settings/ChangeDetails.vue";
import DeleteData from "./components/settings/DeleteData.vue";
import { store } from "vuex";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: Home, meta: { requiresAuth: true } },
    {
      path: "/settings",
      component: Settings,
      redirect: "/settings/details",
      props: true,
      children: [
        {
          path: "details",
          component: ChangeDetails,
          meta: { requiresAuth: true },
        },
        {
          path: "deletedata",
          component: DeleteData,
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters["auth/isAuthenticated"]) {
    next("/home");
  } else {
    next();
  }
});

export default router;

// ADD ROUTE GUARDS
