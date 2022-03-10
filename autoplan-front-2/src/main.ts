import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./components/App/index.vue";
import Id from "./components/Id/index.vue";
import {
  createRouter,
  Router,
  RouteRecordRaw,
  RouterHistory,
  createWebHistory,
} from "vue-router";

const pinia = createPinia();

const history: RouterHistory = createWebHistory();
const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/root" },
  { path: "/:id", name: "Id", component: Id },
];
const router: Router = createRouter({ history, routes });

const app = createApp(App);
app.use(router);
app.use(pinia);

app.mount("#app");
