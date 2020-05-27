import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import axios from 'axios'

// axios.get('/doc').then(res => {
//   //eval(res.data)
//   console.log('doc',res.data)
// })

//__webpack_require__.e('')

Vue.use(VueRouter)

export const routes: Array<RouteConfig> = [
  {
    path: '/app1/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/app1/c',
    name: 'c',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: (resolve) => {
      //window.ssss = __webpack_require__
      return import(/* webpackChunkName: "c" */ '../views/c.vue')
    }
  },
  {
    path: '/app1/d',
    name: 'd',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: (resolve) => {
      return import(/* webpackChunkName: "d" */ '../views/d.vue')
    }
  }
 ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


console.log('install remote router',routes)

export default router
