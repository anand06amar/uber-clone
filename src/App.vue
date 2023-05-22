<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <Header />
    <!-- <SignUp /> -->
    <!-- <LoginComponent /> -->
    <Router-view />
  </div>
</template>

<script>
// import SignUp from './components/SignUp.vue';
import Header from './header.vue';
// import LoginComponent from './components/Login.vue';

export default {
  name: 'App',
  components: {
    // SignUp,
    Header
    // LoginComponent,
    
  },
};
</script>

<style scoped>
  *{
        margin: 0;
        padding: 0;
    }
</style>