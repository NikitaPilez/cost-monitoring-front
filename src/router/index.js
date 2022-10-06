import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("@/views/Auth"),
  },
  {
    path: "/user/:userId/purchases",
    name: "purchaseIndex",
    component: () => import("@/views/purchases/Index"),
  },
  {
    path: "/user/:userId/purchases/:purchaseId",
    name: "purchaseShow",
    component: () => import("@/views/purchases/Show"),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
