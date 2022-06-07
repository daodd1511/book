import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Add from "../components/Add.vue";
import Update from "../components/Update.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/add", name: "Add", component: Add },
    { path: "/update/:id", name: "Update", component: Update },
  ],
});
export default router;
