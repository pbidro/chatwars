import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      hideNavbar: false,
      authRequired: false,
     }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignUpView.vue'),
  
    meta: {
      hideNavbar: false,
      authRequired: false,
     }
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignInView.vue'),
    
    meta: {
      hideNavbar: false,
      authRequired: false,
     }
  },
  {
    path: '/panel',
    name: 'panel',

    component: () => import(/* webpackChunkName: "about" */ '../views/PanelView.vue'),
    meta: {
      hideNavbar: true,
      authRequired: true,
     }
  },
 
  {
    path: '/chat/:name',
    name: 'chat',
    component: () => import(/* webpackChunkName: "about" */ '../views/ChatView.vue'),
    meta: {
      hideNavbar: true,
      authRequired: true,
     }
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('../views/NotFound.vue'),
    meta: {
      hideNavbar: false,
      authRequired: true,
     }
  },
  
]

const router = new VueRouter({
  mode: "history",
  routes
})


export default router
