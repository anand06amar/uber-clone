<template>
  <div class="register-page">
    <div class="register-container">
      <h2>Create an Account</h2>
      <form @submit.prevent="registerUser">
        <div class="form-group">
          <label for="name">Full Name</label>
          <input type="text" id="name" v-model="user.name" required>
        </div>
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" v-model="user.email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="user.password" required>
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" required>
        </div>
        <button class="btn-register">Register</button>
      </form>
      <p class="login-link">Already have an account? <a href="/login">Log in</a></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
      },
      confirmPassword: '',
    };
  },
  // methods: {
  //   registerUser() {
  //     // Implement the registration logic here
  //     console.log('Registering user:', this.user);
  //   },
  // },
};
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
}

.register-container {
  width: 400px;
  padding: 40px;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-size: 16px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-register {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  background-color: #ff5a5f;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-register:hover {
  background-color: #e04044;
}

.login-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}

.login-link a {
  color: #ff5a5f;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
