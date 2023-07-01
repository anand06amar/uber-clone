<template>
  <main class="register-page">
    <section class="register-form">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <input type="email" placeholder="Email address" v-model="registerForm.email" />
        <input type="password" placeholder="Password" v-model="registerForm.password" />
        <input type="submit" value="Register" />
      </form>
      <button @click="handleSignInGoogle">Sign in with Google</button>
      <p class="form-footer">Already have an account? <router-link to="/login">Log in</router-link></p>
    </section>
  </main>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase.js'

export default {
  setup() {
    const registerForm = ref({
      email: '',
      password: ''
    })
    const store = useStore()
    const router = useRouter()

    const register = () => {
      store.dispatch('register', registerForm.value)
    }

    const handleSignInGoogle = async () => {
      try {
        const provider = new GoogleAuthProvider()

        await signInWithPopup(auth, provider)

        // Redirect the user after successful sign-in
        router.push('/')
      } catch (error) {
        console.error('Error signing in with Google:', error)
        alert('Failed to sign in with Google. Please try again.')
      }
    }

    return {
      registerForm,
      register,
      handleSignInGoogle
    }
  }
}
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f1f1f1;
}

.register-form {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 400px;
}

.register-form h2 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.register-form input[type="email"],
.register-form input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.register-form input[type="submit"] {
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.register-form input[type="submit"]:hover {
  background-color: #555;
}

.register-form .form-footer {
  text-align: center;
  margin-top: 20px;
}

.register-form .form-footer p {
  margin: 0;
}

.register-form .form-footer a {
  color: #333;
  text-decoration: none;
}

.register-form .form-footer a:hover {
  text-decoration: underline;
}
</style>
