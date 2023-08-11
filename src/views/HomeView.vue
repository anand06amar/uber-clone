<template>
  <div class="home-page">
    <nav class="navbar">
      <div class="navbar-brand">
        <i class="navbar-icon fas fa-car"></i>
        <span class="navbar-title">UberApp</span>
      </div>
    </nav>
    <div class="options-container">
      <div class="option driver" @click="goToDriverRegistration"
        :class="{ 'animated rubberBand': selectedOption === 'driver' }">
        <i class="icon fas fa-car"></i>
        <img src="https://cdn-icons-png.flaticon.com/512/2/2087.png" alt="Driver Icon" class="icon" />
        <span class="option-text">Drive</span>
      </div>
      <div class="option rider" @click="goToRiderRegistration"
        :class="{ 'animated rubberBand': selectedOption === 'rider' }">
        <i class="icon fas fa-user"></i>
        <img src="https://cdn-icons-png.flaticon.com/512/60/60738.png" alt="Driver Icon" class="icon" />
        <span class="option-text">Ride</span>
      </div>
    </div>
    <div v-if="selectedOption" class="selected-option">
      <div class="selected-option-content" :class="{ 'animated slideInDown': selectedOption }">
        <h2 v-if="selectedOption === 'driver'">Driver Login</h2>
        <h2 v-else-if="selectedOption === 'rider'">Rider Registration</h2>
        <!-- Your driver login and rider registration forms go here -->
      </div>
      <button @click="deselectOption" class="animated fadeIn">Back</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedOption: null,
    };
  },
  methods: {
    goToDriverRegistration() {
      this.$router.push("/driver");
    },
    goToRiderRegistration() {
      this.$router.push("/register");
    },

    selectDriver() {
      this.selectedOption = "driver";
    },
    selectRider() {
      this.selectedOption = "rider";
    },
    deselectOption() {
      this.selectedOption = null;
    },
  },
};
</script>

<style>
/* Add CSS styles for animations here, or use CSS frameworks like animate.css */

/* Sample styles for the options */
.options-container {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}

.option-text {
  font-size: 18px;
  font-weight: bold;
  /* Make the text bold */
}

.option {
  cursor: pointer;
  padding: 30px;
  margin: 40px;
  border: 5px solid #000000;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  background-color: #f9f9f9;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  width: 220px;
}

.option:hover {
  background-color: #c0c0c0;
  color: #fff;
  transform: translateY(-5px);
}

.icon {
  font-size: 40px;
  margin-bottom: 10px;
  color: #000000;
}

/* Sample styles for the selected option */
.selected-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

.selected-option-content {
  text-align: center;
}

h2 {
  font-size: 28px;
  margin-bottom: 20px;
}

button {
  cursor: pointer;
  padding: 10px 20px;
  background-color: #000000;
  color: #fff;
  border: none;
  border-radius: 8px;
  margin-top: 20px;
  font-size: 16px;
}

/* Additional animation for the button */
button.animated.fadeIn {
  animation-delay: 0.5s;
}

.navbar {
  background-color: #000;
  color: #fff;
  padding: 10px 0;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  display: flex;
  align-items: center;
  margin: 0 auto;
}

.navbar-icon {
  font-size: 24px;
  margin-right: 10px;
}

.navbar-title {
  font-size: 18px;
  font-weight: bold;
}

.template {
  background-color: #472a2a;
  /* Replace with your desired greyish color */
}
</style>
