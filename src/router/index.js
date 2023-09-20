import { createWebHistory, createRouter } from "vue-router";
import UsersList from "../components/UsersList.vue";
import SignUp from "../components/SignUp.vue";

const routes = [
  {
    path: "/",
    component: SignUp,
  },
  {
    path: "/profile",
    component: UsersList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
