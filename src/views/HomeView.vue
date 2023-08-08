<template>
  <div class="home-page">
    <div class="options-container">
      <div
        class="option driver"
        @click="goToDriverRegistration"
        :class="{ 'animated rubberBand': selectedOption === 'driver' }"
      >
        <i class="icon fas fa-car"></i>
        <span>Driver</span>
      </div>
      <div
        class="option rider"
        @click="goToRiderRegistration"
        :class="{ 'animated rubberBand': selectedOption === 'rider' }"
      >
        <i class="icon fas fa-user"></i>
        <span>Rider</span>
      </div>
    </div>
    <div v-if="selectedOption" class="selected-option">
      <div
        class="selected-option-content"
        :class="{ 'animated slideInDown': selectedOption }"
      >
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
      this.$router.push('/driver');
    },
    goToRiderRegistration() {
      this.$router.push('/register');
    },
    
    selectDriver() {
      this.selectedOption = 'driver';
    },
    selectRider() {
      this.selectedOption = 'rider';
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

.option {
  cursor: pointer;
  padding: 20px;
  margin: 20px;
  border: 1px solid #007bff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  background-color: #f9f9f9;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.option:hover {
  background-color: #007bff;
  color: #fff;
  transform: translateY(-5px);
}

.icon {
  font-size: 40px;
  margin-bottom: 10px;
  color: #007bff;
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
  background-color: #007bff;
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
</style>

<!-- Add the following link to your index.html file to use animate.css -->
<!-- <link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
/> -->
