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
import Test1 from "./components/Test1.vue";
import Test2 from "./components/Test2.vue";
import Edit from "./components/Edit/index.vue";
import RoundButton from "./components/RoundButton.vue";

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
//* componentes globales para los brick
app.component("Test1", Test1);
app.component("Test2", Test2);
app.component("RoundButton", RoundButton);
app.component("Edit", Edit);

app.mount("#app");
