<template>
  <main class="register-page">
    <section class="register-form">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <input type="email" placeholder="Email address" v-model="register_form.email" />
        <input type="password" placeholder="Password" v-model="register_form.password" />
        <input type="submit" value="Register" />
      </form>
      <button @click="handleSignInGoogle">Sign in with Google</button>
      <p class="form-footer">Already have an account? <router-link to="/login">Log in</router-link></p>
    </section>
  </main>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const router = useRouter()
const provider = new GoogleAuthProvider()

export default {
  setup() {
    const register_form = ref({})
    const store = useStore()

    const register = () => {
      store.dispatch('register', register_form.value)
    }

    const handleSignInGoogle = () => {
      const auth = getAuth()
      signInWithPopup(auth, provider)
        .catch((error) => {
          if (error.code === 'auth/cancelled-popup-request') {
            // Handle the error when the user cancels the sign-in popup
            console.log('Sign-in with Google was cancelled by the user.')
          } else if (error.code === 'auth/popup-closed-by-user') {
            // Handle the error when the user closes the sign-in popup
            console.log('Sign-in with Google popup was closed by the user.')
          } else {
            // Handle other errors
            console.error(error)
          }
        })
    }

    onMounted(() => {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          // Redirect to the home page
          router.push('/')
        }
      })
    })

    return {
      register_form,
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
