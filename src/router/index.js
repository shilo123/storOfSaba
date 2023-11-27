import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import tashlum from "@/views/productsTashlumView.vue";
import bakara from "@/views/dafBakara.vue";
import pratim from "@/views/PirteyHazmana.vue";
import logco from "@/views/logco.vue";
import succes from "@/views/succesView.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/tashlum/:id",
    name: "tashlum",
    component: tashlum,
  },
  {
    path: "/Daf-bakara-of-saba-moshe",
    name: "Daf-bakara",
    component: bakara,
  },
  {
    path: "/pratim/:id",
    name: "pratim",
    component: pratim,
  },
  {
    path: "/avtaha",
    name: "avtaha",
    component: logco,
  },
  {
    path: "/succes",
    name: "succes",
    component: succes,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
