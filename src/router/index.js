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
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignUpView.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignInView.vue')
  },
  {
    path: '/panel',
    name: 'panel',

    component: () => import(/* webpackChunkName: "about" */ '../views/PanelView.vue'),
    meta: {
      hideNavbar: true,
     }
  },
  {
    path: '/debug',
    name: 'debug',
    component: () => import(/* webpackChunkName: "about" */ '../views/DebugRoom.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
