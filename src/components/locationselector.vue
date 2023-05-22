<template>
  <div class="home">
    <header class="header">
      <!-- <h1 class="logo">Uber</h1> -->
      <nav class="nav-links">
        <!-- <a href="#">Home</a>
        <a href="#">Rides</a>
        <a href="#">Driver</a>
        <a href="#">Help</a> -->
      </nav>
    </header>

    <main class="hero">
      <h2>Get a ride in minutes</h2>
      <p>Book a reliable ride in just a few clicks.</p>
      <RouterLink to="/booking"><button class="btn">Book Now</button></RouterLink>
    </main>

    <section class="features">
      <div class="feature">
        <!-- <img src="/assets/logo.svg" alt="Location Icon" /> -->
        <h3>Choose your destination</h3>
        <p>Enter your destination and get an estimated fare.</p>
      </div>
      <div class="feature">
        <img src="../assets/car.png" alt="Car Icon" />
        <h3>Select a ride</h3>
        <p>Choose from a variety of available ride options.</p>
      </div>
      <div class="feature">
        <!-- <img src="/assets/icon-payment.png" alt="Payment Icon" /> -->
        <h3>Make a payment</h3>
        <p>Pay easily with multiple payment options.</p>
      </div>
    </section>

    <!-- <footer class="footer">
      <p>&copy; 2023 Uber. All rights reserved.</p>
    </footer> -->
  </div>
</template>

<script>
export default {
  name: 'Home'
  // Add any necessary data, methods, and other component options
};
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #ff5a5f;
}

.nav-links a {
  margin-right: 10px;
  color: #333333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #ff5a5f;
}

.hero {
  text-align: center;
  margin-bottom: 40px;
}

.hero h2 {
  font-size: 32px;
  margin-bottom: 10px;
  color: #333333;
}

.hero p {
  font-size: 18px;
  color: #777777;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ff5a5f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #e04044;
}

.features {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}

.feature {
  flex-basis: 30%;
  text-align: center;
}

.feature img {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
}

.feature h3 {
  font-size: 24px;
  margin-bottom: 10px;
  color: 333333;
}

.feature p {
font-size: 16px;
color: #777777;
}

.footer {
text-align: center;
color: #999999;
}
</style>
