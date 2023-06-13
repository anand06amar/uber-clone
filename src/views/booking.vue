<template>
    <div class="pickup-destination">
      <h2 class="title">Set Pickup and Destination</h2>
      <div class="input-wrapper">
        <label for="pickup" class="label"></label>
        <input type="text" id="pickup" class="input" v-model="pickupLocation"
        placeholder="Enter the pickup point" />
      </div>
      <div class="input-wrapper">
        <!-- <label for="destination" class="label">Destination</label> -->
        <input type="text" id="destination" class="input" v-model="destinationLocation" 
        placeholder="Where to?"/>
      </div>
      <RouterLink to="/map"><button class="btn">Confirm Ride</button></RouterLink>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        pickupLocation: '',
        destinationLocation: ''
      };
    },
    methods: {
      confirmRide() {
        // You can perform any necessary actions here, such as calling an API or showing a confirmation message
        const rideDetails = {
          pickup: this.pickupLocation,
          destination: this.destinationLocation
        };
        console.log(rideDetails);
        // Reset the input fields after confirming the ride
        this.pickupLocation = '';
        this.destinationLocation = '';
      }
    }
  };
  </script>
  
  <style scoped>
  .pickup-destination {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    text-align: left;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .input-wrapper {
    margin-bottom: 20px;
  }
  
  .label {
    display: block;
    font-size: 16px;
    margin-bottom: 5px;
  }
  
  .input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .confirm-button {
    display: block;
    width: 100%;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    background-color: #0089ff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  