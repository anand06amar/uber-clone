import { createRouter, createWebHistory } from 'vue-router'

// import HomeView from '../views/HomeView.vue'
import Favourites from '../components/favourites.vue'
import SignUp from '../components/SignUp.vue'
import location from '../components/locationselector.vue'
import booking from '../components/booking.vue'
// import Rides from '../components/rides.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'SignUp',
      component: SignUp
    },{
      path: '/favourites',
      name: 'Favourites',
      component: Favourites
    },
    {
      path: '/locations',
      name: 'location',
      component: location
  },{
    path: '/booking',
    name: 'booking',
    component: booking
},
  // {
  //     path: '/Rides',
  //     name: 'Rides',
  //     component: Rides
  //   },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
