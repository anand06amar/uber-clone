import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { auth } from '../firebase.js'
// import login from '../views/login.vue'
// import SignUp from '../views/SignUp.vue'



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  // {
  //   path: '/about',
  //   name: 'about',
    
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')

  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/SignUp.vue')

  },
  {
    path: '/booking',
    name: 'SignUp',
    component: () => import('../views/booking.vue')

  },
  {
    path: '/map',
    name: 'map',
    component: () => import('../views/map.vue')

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)  =>{
  if (to.path ===  '/login' && auth.currentUser) {
    next('/')
    return;
  }

  if (to.matched.some(record => record.meta.requiresAuth)  && !auth.
  currentUser) {
    next('/login')
    return;

  }

  next();
})

export default router
