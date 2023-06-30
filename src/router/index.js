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
    component: () => import('../components/login.vue')

  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/SignUp.vue')

  },
  {
    path: '/booking',
    name: 'Booking',
    component: () => import('../components/booking.vue')

  },
  {
    path: '/trip',
    name: 'Trip',
    component: () => import('../views/trip.vue')

  },
  {
    path: '/ride',
    name: 'ride',
    component: () => import('../components/Search.vue')

  },
  {
    path: '/confirm',
    name: 'confirm',
    component: () => import('../components/Confirm.vue')

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
