<template>
    <div class="wrapper">
      <div class="image-container">
        <img src="../assets/left.png" alt="Back Icon" class="back-icon" />
      </div>
      <div class="content-container">
        <h1>Book a Ride</h1>
        <div class="input-container">
          <label for="pickup">Pickup Location</label>
          <input type="text" id="pickup" placeholder="Enter pickup location" />
        </div>
        <div class="input-container">
          <label for="destination">Destination</label>
          <input type="text" id="destination" placeholder="Enter destination" />
        </div>
        <button class="book-button">Book Now</button>
      </div>
    </div>
  </template>
  
  <style>
  .wrapper {
    background-color: #fff;
    height: 100vh;
    display: flex;
  }
  
  .image-container {
    padding: 20px;
  }
  
  .back-icon {
    width: 40px;
    height: 40px;
  }
  
  .content-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .input-container {
    margin-bottom: 10px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input[type="text"] {
    width: 300px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button.book-button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
  }
  </style>
  