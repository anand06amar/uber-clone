import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import { auth } from '../firebase'
// import login from '../views/login.vue'
// import SignUp from '../views/SignUp.vue'
import Search from '../components/Search.vue'
import Map from '../components/map.vue'
import riderVue from '@/components/rider.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    // meta: {
    //   requiresAuth: true
    // }
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
    path: '/driverhome',
    name: 'driver_home',
    component: () => import('../components/driverhome.vue')

  },
  {
    path: '/uberX',
    name: 'uber',
    component: () => import('../components/uberX.vue')

  },
  {
    path: '/driver',
    name: 'driver',
    component: () => import('../components/driverregister.vue')

  },
  {
    path: '/login2',
    name: 'login2',
    component: () => import('../components/driver_login.vue')

  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../components/homeview.vue'),
    meta: {
      requiresAuth: true
    }

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
    path: '/riderchat',
    name: 'riderchat',
    component: () => import('../components/Riderchat.vue')

  },
  {
    path: '/trip', // Assuming this is the route to the Favorites page
    name: 'Trip',
    component: () => import('../components/Favorites.vue'),
    meta: {
      requiresAuth: true // Require authentication to access this route
    }
  },
  {
    path: '/ride-map',
    name: 'ride-map',
    component: () => import('../components/RideMap.vue')

  },
  {
    path: '/rider-page',
    name: 'rider-page',
    component: riderVue,
    props: (route) => ({
      pickupLocation: route.query.pickupLocation,
      dropoffLocation: route.query.dropoffLocation,
    })
  },
  {
    path: '/Search',
    name: 'ride',
    component: Search,


  },
  {
    path: '/confirm',
    name: 'confirm',
    component: Map,
    props: (route) => ({
      pickuplocation: route.query.pickuplocation,
      dropofflocation: route.query.dropofflocation,
      carName: route.query.carName,
      price: route.query.price,
      distance: route.query.distance
    })

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Inside the beforeEach guard
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('User from localStorage:', user);

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !user) {
    console.log('User not authenticated. Redirecting to login.');
    next('/login'); // Redirect to the login page if not authenticated
  } else {
    console.log('User authenticated or route does not require auth. Proceeding.');
    next();
  }
});



// router.beforeEach((to, from, next)  =>{
//   if (to.path ===  '/login' && auth.currentUser) {
//     next('/')
//     return;
//   }

//   if (to.matched.some(record => record.meta.requiresAuth)  && !auth.
//   currentUser) {
//     next('/login')
//     return;

//   }

//   next();
// })

export default router;