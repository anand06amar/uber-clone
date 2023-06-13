<template>
  <nav>
    <div class="logo">Uber</div>
    <ul class="nav-links">
      <button @click="$store.dispatch('logout')">Logout</button>
      <!-- <li class="nav-item">
        <RouterLink to="locations">logout</RouterLink>
      </li> -->
      <!-- <li class="nav-item">
        <RouterLink to="favourites">Favourites</RouterLink>
      </li> -->
      <!-- <li class="nav-item">
        <RouterLink to="Rides">Rides</RouterLink>
      </li> -->
      <!-- <li class="nav-item">
        <RouterLink to="register">Register</RouterLink>
      </li> -->
    </ul>
  </nav>
  <div class="home">
      <header class="header">
        <!-- <h1 class="logo">Uber</h1> -->
        <!-- <nav class="nav-links">
         
        </nav> -->
      </header>
  
      <main class="hero">
        <h2>Get a ride in minutes</h2>
        <p>Book a reliable ride in just a few clicks.</p>
        <RouterLink to="/booking"><button class="btn">Book Now</button></RouterLink>
      </main>
  
      <section class="features">
        <div class="feature">
          <img src="../assets/destination.png" alt="Location Icon" />
          <h3>Choose your destination</h3>
          <p>Enter your destination and get an estimated fare.</p>
        </div>
        <div class="feature">
          <img src="../assets/car.png" alt="Car Icon" />
          <h3>Select a ride</h3>
          <p>Choose from a variety of #available ride options.</p>
        </div>
        <div class="feature">
          <img src="../assets/payment.png" alt="Payment Icon" />
          <h3>Make a payment</h3>
          <p>Pay easily with multiple payment options.</p>
        </div>
      </section>
  
      
    </div>

</template>

<script>
export default {
  name: 'Navbar',
}
</script>

<style scoped>
nav {
  margin-top: -70px;
  margin-left: -8px; /* Reduce the margin here */
  /* margin-bottom: 0px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000000;
  color: #000000;
  padding: 20px;
  width: 96vw;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.nav-links {
  list-style: none;
  display: flex;
}

.nav-item {
  margin-left: 20px;
}

.nav-item a {
  color: #f1e8e8;
  text-decoration: none;
}

.nav-item a:hover {
  text-decoration: underline;
}

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
  

  
  /* .nav-links a {
    margin-right: 10px;
    color: #333333;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .nav-links a:hover {
    color: #ff5a5f;
  } */
  
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
    color: rgb(0, 0, 0);
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
  .black-background {
  background-color: black;
}
</style>

