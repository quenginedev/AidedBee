import Vue from 'vue'
import VueRouter from 'vue-router'
import routerPaths from './paths'

Vue.use(VueRouter)

const routes = routerPaths

const router = new VueRouter({
  routes
})

export default router
