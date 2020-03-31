import Vue from "vue";
import VueRouter from "vue-router";

// Vista Comun: Error
import Error404 from "../views/Error404"

// Rutas
import routesPrivadas from "../router/routes/v1/private/routesPrivadas";
import routesPublicas from "../router/routes/v1/public/routesPublicas";

Vue.use(VueRouter);

const routes = [
  ...routesPublicas,
  ...routesPrivadas,
  {
    // will match everything
    path: "*",
    component: Error404
  }
];

// console.log("routes", routes);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
