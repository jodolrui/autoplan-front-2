import { createApp, InjectionKey } from "vue";
import { createPinia } from "pinia";
import {
  createRouter,
  Router,
  RouteRecordRaw,
  RouterHistory,
  createWebHistory,
} from "vue-router";
import App from "./components/App/index.vue";
import Id from "./components/Id/index.vue";
import Rack from "@jodolrui/racket/Rack.vue";
import Cell from "./components/Cell.vue";
import Edit from "./components/Edit/index.vue";
import RoundButton from "./components/RoundButton.vue";
import Button from "./components/Button.vue";

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
app.component("Rack", Rack);
app.component("Cell", Cell);
app.component("RoundButton", RoundButton);
app.component("Button", Button);
app.component("Edit", Edit);

app.mount("#app");
