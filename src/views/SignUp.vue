<template>
    
    <main class="login">
        <section class ="forms">

            <form class="register"  @submit.prevent="register">
                <h2>Register</h2>
                <input 
                type="email" 
                placeholder="Email address"
                v-model="register_form.email" />
                
            <input type="password"
            placeholder="password"
            v-model="register_form.password" />
            <input 
            type="submit"
            value="Register" />
            </form>
            <RouterLink to="/login" ><p class="login-link">Already have an account? <a href="/login">Log in</a></p></RouterLink>

        </section>
    </main>
</template>

<script>
import { ref } from 'vue'
import { useStore} from 'vuex'


export default {
    setup () {
        const register_form = ref({});
        const store = useStore();


        const register = () => {
            store.dispatch('register', register_form.value);
        }
        return {
            
            register_form,
            
            register


        }
    }
}

</script>

<style>
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

.register-form input[type="text"],
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