<template>
    <main class="login">
        <section class ="forms">

            <!-- <form class="register"  @submit.prevent="register">
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
            </form> -->

            <form class="login"  @submit.prevent="login">
                <h2>Login</h2>
                <input 
                type="email" 
                placeholder="Email address"
                v-model="login_form.email" />
                
            <input type="password"
            placeholder="password"
            v-model="login_form.password" />
            <input 
            type="submit"
            value="Login" />
            </form>
            
        <RouterLink to="/register" ><p class="SignUp-link">Don't have an account? <a href="/SignUp">Sign up</a></p></RouterLink>

           

        </section>
    </main>
</template>

<script>
import { ref } from 'vue'
import { useStore} from 'vuex'


export default {
    setup () {
        const login_form = ref({});
        // const register_form = ref({});
        const store = useStore();

        const login = () => {
            store.dispatch('login', login_form.value);
        }


        // const register = () => {
        //     store.dispatch('register', register_form.value);
        // }
        return {
            login_form,
            // register_form,
            login
            // register


        }
    }
}

</script>

<style>
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