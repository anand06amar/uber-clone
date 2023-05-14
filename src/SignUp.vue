<template>
    <div class="signup-container">
      <h1>Sign Up</h1>
      <form @submit.prevent="submitForm" class="signup-form">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" class="form-control">
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" class="form-control">
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" class="form-control">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: ''
      };
    },
    methods: {
      submitForm() {
        // Perform sign-up logic here
        console.log('Sign-up form submitted');
        console.log('Name:', this.name);
        console.log('Email:', this.email);
        console.log('Password:', this.password);
        // Reset form fields
        this.name = '';
        this.email = '';
        this.password = '';
      }
    }
  };
  </script>
  
  <style scoped>
  .signup-container {
    width: 400px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
    background-color: #f2f2f2;
  }
  
  .signup-form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 10px;
  }
  
  label {
    font-weight: bold;
  }
  
  .form-control {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #ff4081;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #ff80ab;
  }
  </style>
  