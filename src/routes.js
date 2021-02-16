import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/home.vue";
import Settings from "./pages/Settings.vue";
import ChangeDetails from "./components/settings/ChangeDetails.vue";
import DeleteData from "./components/settings/DeleteData.vue";
import SignIn from "./components/settings/SignIn.vue";
import SignUp from "./components/settings/SignUp.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: Home },
    {
      path: "/settings",
      component: Settings,
      redirect: "/settings/details",
      props: true,
      children: [
        { path: "details", component: ChangeDetails },
        { path: "deletedata", component: DeleteData },
        { path: "signin", component: SignIn },
        { path: "signup", component: SignUp }
      ]
    }
  ]
});

export default router;

// ADD ROUTE GUARDS