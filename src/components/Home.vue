<template>
  <div class="home">
    <nav class="navbar">
      <div class="logo">Uber</div>
      <ul class="nav-links">
        <RouterLink to="/trip"><button class="btn">Trip</button></RouterLink>
        <button @click="logout">Logout</button>
      </ul>
    </nav>

    <header class="hero">
      <h1 class="hero-title">Uber</h1>
      <p class="hero-subtitle">Book a reliable ride in just a few clicks</p>
      <router-link to="/booking" class="btn">Book Now</router-link>
    </header>

    <section class="features">
      <div class="feature">
        <img src="../assets/destination.png" alt="Location Icon" />
        <h2 class="feature-title">Choose your destination</h2>
        <p class="feature-description">
          Enter your destination and get an estimated fare
        </p>
      </div>
      <div class="feature">
        <img src="../assets/car.png" alt="Car Icon" />
        <h2 class="feature-title">Select a ride</h2>
        <p class="feature-description">
          Choose from a variety of available ride options
        </p>
      </div>
      <div class="feature">
        <img src="../assets/payment.png" alt="Payment Icon" />
        <h2 class="feature-title">Make a payment</h2>
        <p class="feature-description">
          Pay easily with multiple payment options
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      // Clear user data from localStorage
      localStorage.removeItem('user');
      // You can also clear other relevant data if needed
      // For example: localStorage.removeItem('token');

      // Redirect to login page or perform other actions
      this.$router.push('/login');
    }
  }
};
</script>
<style>
/* Global Styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f2f2f2;
}

/* Navbar Styles */
.navbar {
  margin-top: 0px;
  background-color: #333;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 24px;
}

.nav-links {
  list-style: none;
  display: flex;
  align-items: center;
}

.nav-links button {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;
}

/* Hero Styles */
.hero {
  text-align: center;
  padding: 100px 0;
  background-color: #333;
  color: white;
}

.hero-title {
  font-size: 48px;
  margin-bottom: 20px;
  opacity: 0;
  transform: translateY(-20px);
  animation: fadeInDown 1s forwards;
}

.hero-subtitle {
  font-size: 24px;
  margin-bottom: 40px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1s forwards;
  animation-delay: 0.5s;
}

.btn {
  background-color: #ff5e3a;
  color: white;
  padding: 16px 32px;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  opacity: 0;
  transform: scale(0.8);
  animation: fadeInUp 1s forwards;
  animation-delay: 1s;
}

/*  */
.btn:hover {
  background-color: #ff784f;
}

/* Features Styles */
.features {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  padding: 40px 0;
}

.feature {
  text-align: center;
  max-width: 300px;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  margin: 0 20px;
  opacity: 0;
  transform: scale(0.8);
  animation: fadeInUp 1s forwards;
}

.feature:hover {
  transform: translateY(-10px);
}

.feature img {
  width: 80px;
  margin-bottom: 20px;
  margin: auto;
}

.feature-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.feature-description {
  font-size: 16px;
  color: #777;
}

/* Animation Keyframes */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title,
.hero-subtitle,
.feature-title,
.feature-description {
  font-family: 'Montserrat', sans-serif;
  /* Example font-family */
}

/* Color Palette */
.hero {
  background-color: #333;
  color: white;
}

.btn {
  background-color: #ff5e3a;
  color: white;
  padding: 16px 32px;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  opacity: 0;
  transform: scale(0.8);
  animation: fadeInUp 1s forwards;
  animation-delay: 1s;
}

/* Button Hover Effect */
.btn:hover {
  background-color: #ff784f;
  transform: scale(1);
  /* Slightly scale up on hover */
}
</style>