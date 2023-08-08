<!-- <template>
    <main class="login-page">
      <section class="login-card">
        <h2 class="login-title">Login</h2>
        <form class="login-form" @submit.prevent="login">
          <input type="email" class="input-field" placeholder="Email address" v-model="login_form.email" />
          <input type="password" class="input-field" placeholder="Password" v-model="login_form.password" />
          <button type="submit" class="login-btn">Login</button>
        </form>
        <button class="google-signin" @click="handleSignInGoogle">
    <span class="icon">
      <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png" alt="Google" />
    </span>
    Sign in with Google
  </button>
        <p class="SignUp-link">Don't have an account? <router-link to="/register">Sign up</router-link></p>
        <p class="Login-link">Login as the Driver <router-link to="/register">Login</router-link></p>
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
      const login_form = ref({})
      const store = useStore()
      const router = useRouter()
  
      const login = () => {
        store.dispatch('login', login_form.value)
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
        login_form,
        login,
        handleSignInGoogle
      }
    }
  }
  </script>
  
  <style scoped>

.google-signin {
  background-color: #db4437;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  margin: 20px auto;
}

.google-signin:hover {
  background-color: #c43c32;
}

.google-signin .icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.google-signin .icon img {
  width: 100%;
  height: 100%;
}
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
  .Login-link {
    margin-top: 20px;
    text-align: center;
    font-size: 14px;
    color: #3939eb;
  }
  
  .Login-link a {
    color: #ff00b3;
    text-decoration: none;
  }
  
  .Login-link a:hover {
    text-decoration: underline;
  }
  </style>
   -->