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
     }
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
      authRequired: true
     }
  },
  {
    path: '/debug',
    name: 'debug',
    component: () => import(/* webpackChunkName: "about" */ '../views/DebugRoom.vue')
  },
  {
    path: '/chat/:name',
    name: 'chat',
    component: () => import(/* webpackChunkName: "about" */ '../views/ChatView.vue'),
    meta: {
      hideNavbar: true,
     }
  },
]

const router = new VueRouter({

  routes
})



import { getAuth } from "firebase/auth";
router.beforeEach((to, from, next) => {
console.log('pase por el before each')
  const { currentUser } = getAuth()
  
  const { meta: { authRequired } } = to
  if (currentUser && authRequired) {
    console.log(currentUser)
    console.log(`el usuario ingresado es ${currentUser.uid} & su correo es  ${currentUser.uid}`)
    console.log(`cu: ${currentUser} y ar: ${authRequired} redirigir a next`)
    next()
  } else if (!currentUser && authRequired) {
    console.log(currentUser)
    console.log(`cu: ${currentUser} y ar: ${authRequired} redirigir a register`)
    next("/")
  }
  else {
    console.log(currentUser)
    console.log(`cu: ${currentUser} y ar:${authRequired} redirigir a nextpage`)
    next()
  }
})

export default router
