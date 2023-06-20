<template>
    <div class="trip-page">
      <header class="trip-header">
        <h1 class="trip-title">Your Trip Details</h1>
      </header>
  
      <div class="trip-details">
        <div class="detail">
          <div class="icon-container">
            <!-- <img src="../assets/start-location.png" alt="Start Location Icon" /> -->
          </div>
          <div class="info">
            <h2 class="detail-title">Pickup</h2>
            <p class="detail-description">{{ pickupLocation }}</p>
          </div>
        </div>
  
        <div class="detail">
          <div class="icon-container">
            <!-- <img src="../assets/end-location.png" alt="End Location Icon" /> -->
          </div>
          <div class="info">
            <h2 class="detail-title">Destination</h2>
            <p class="detail-description">{{ destinationLocation }}</p>
          </div>
        </div>
  
        <div class="detail">
          <div class="icon-container">
            <!-- <img src="../assets/car.png" alt="Car Icon" /> -->
          </div>
          <div class="info">
            <h2 class="detail-title">Car</h2>
            <p class="detail-description">{{ selectedCar }}</p>
          </div>
        </div>
  
        <div class="detail">
          <div class="icon-container">
            <!-- <img src="../assets/payment.png" alt="Payment Icon" /> -->
          </div>
          <div class="info">
            <h2 class="detail-title">Payment</h2>
            <p class="detail-description">{{ paymentMethod }}</p>
          </div>
        </div>
      </div>
  
      <div class="trip-actions">
        <button class="btn" @click="confirmTrip">Confirm Trip</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        pickupLocation: '',
        destinationLocation: '',
        selectedCar: '',
        paymentMethod: ''
      };
    },
    methods: {
      confirmTrip() {
        // Perform necessary actions, such as booking the trip or displaying a confirmation message
        console.log('Trip confirmed!');
      }
    }
  };
  </script>
  
  <style scoped>
  .trip-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .trip-header {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .trip-title {
    font-size: 36px;
  }
  
  .trip-details {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
  }
  
  .detail {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .icon-container {
    width: 60px;
    height: 60px;
    background-color: #f2f2f2;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
  }
  
  .icon-container img {
    width: 40px;
  }
  
  .detail-title {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .detail-description {
    font-size: 16px;
    color: #777;
  }
  
  .trip-actions {
    text-align: center;
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
  }
  
  .btn:hover {
    background-color: #ff784f;
  }
  </style>
  