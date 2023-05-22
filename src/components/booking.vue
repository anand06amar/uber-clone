<template>
    <div class="booking-page">
      <h1 class="title">Booking Page</h1>
      <div class="form-group">
        <label for="pickup-location">Pickup Location:</label>
        <input v-model="pickupLocation" type="text" id="pickup-location" placeholder="Enter pickup location" />
      </div>
      <div class="form-group">
        <label for="dropoff-location">Drop-off Location:</label>
        <input v-model="dropOffLocation" type="text" id="dropoff-location" placeholder="Enter drop-off location" />
      </div>
      <div class="form-group">
        <label for="date">Date:</label>
        <input v-model="date" type="date" id="date" />
      </div>
      <div class="form-group">
        <label for="time">Time:</label>
        <input v-model="time" type="time" id="time" />
      </div>
      <button class="book-button" @click="bookRide">Book Ride</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        pickupLocation: '',
        dropOffLocation: '',
        date: '',
        time: '',
      };
    },
    methods: {
      bookRide() {
        // Perform booking logic here
        const bookingData = {
          pickupLocation: this.pickupLocation,
          dropOffLocation: this.dropOffLocation,
          date: this.date,
          time: this.time,
        };
        // Send booking data to the server or perform any necessary actions
        console.log(bookingData);
      },
    },
  };
  </script>
  
  <style scoped>
  .booking-page {
    max-width: 400px;
    margin: 0 auto;
    margin-left: auto;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #000;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-size: 16px;
    color: #333;
  }
  
  input[type="text"],
  input[type="date"],
  input[type="time"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    color: #333;
  }
  
  .book-button {
    display: block;
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    background-color: #1fbad6;
    cursor: pointer;
  }
  
  .book-button:hover {
    background-color: #1b9dbd;
  }
  </style>
  