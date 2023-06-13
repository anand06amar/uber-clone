<template>
  <main class="login-page">
    <section class="login-card">
      <h2 class="login-title">Login</h2>
      <form class="login-form" @submit.prevent="login">
        <input type="email" class="input-field" placeholder="Email address" v-model="login_form.email" />
        <input type="password" class="input-field" placeholder="Password" v-model="login_form.password" />
        <button type="submit" class="login-btn">Login</button>
      </form>
      <p class="SignUp-link">Don't have an account? <router-link to="/register">Sign up</router-link></p>
    </section>
  </main>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const login_form = ref({})
    const store = useStore()

    const login = () => {
      store.dispatch('login', login_form.value)
    }

    return {
      login_form,
      login
    }
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f3f3;
}

.login-card {
  width: 400px;
  padding: 40px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.login-title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: #333333;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.input-field {
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #dddddd;
  font-size: 14px;
}

.login-btn {
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #0f3f72;
  color: #fef8f8;
  font-size: 14px;
  cursor: pointer;
}

.SignUp-link {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #3939eb;
}

.SignUp-link a {
  color: #ff00b3;
  text-decoration: none;
}

.SignUp-link a:hover {
  text-decoration: underline;
}
</style>
