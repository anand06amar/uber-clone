<template>
  <div>
    <h1>Cab Booking Details</h1>
    <form @submit.prevent="bookCab">
      <label for="pickupLocation">Pickup Location</label>
      <input v-model="pickupLocation" type="text" id="pickupLocation" required>
      
      <label for="dropoffLocation">Dropoff Location</label>
      <input v-model="dropoffLocation" type="text" id="dropoffLocation" required>
      
      <button type="submit">Book Cab</button>
    </form>
  </div>
</template>

<script>
import { db } from '../firebase.js';

export default {
  data() {
    return {
      pickupLocation: '',
      dropoffLocation: ''
    };
  },
  methods: {
    bookCab() {
      console.log(db.collection); // Check if this logs the correct object

      // Create a new booking document in Firebase Firestore
      db.collection('Riders').add({
        pickupLocation: this.pickupLocation,
        dropoffLocation: this.dropoffLocation,
        timestamp: new Date()
      })
      .then(() => {
        console.log('Booking added successfully');
        // Clear form fields
        this.pickupLocation = '';
        this.dropoffLocation = '';
      })
      .catch(error => {
        console.error('Error adding booking: ', error);
      });
    }
  }
};
</script>
