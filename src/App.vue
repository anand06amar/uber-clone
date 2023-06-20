<template>
  <div id="nav" v-if="$store.state.user">
    <!-- <Navbar /> -->
  <nav>
    <!-- <router-link to="/">Home</router-link>  -->
    <!-- <router-link to="/about">About</router-link> -->
    <!-- <button @click="$store.dispatch('logout')">Logout</button> -->
  </nav>
  </div>
  <router-view/>
</template>

<script>
import { onBeforeMount } from 'vue'
import {  useStore } from 'vuex'


// import Navbar from '../HomeView.vue'

export default {
  // name:'App',
  // components: {
  //   Navbar
  // },
  setup() {
    const store = useStore()

    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })

    // return {
    //   user: store.state.user
    // } 


  }
}
</script>



<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
