<template>
    <div>
      <h2>Favorite Places</h2>
      <ul>
        <li v-for="place in favoritePlaces" :key="place.id">
          {{ place.name }}
          <button @click="removePlace(place.id)">Remove</button>
        </li>
      </ul>
  
      <form @submit.prevent="addPlace">
        <input type="text" v-model="newPlace" placeholder="Enter a new place">
        <button type="submit">Add</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        favoritePlaces: [
         
        ],
        newPlace: '',
        placeId: 4,
      };
    },
    methods: {
      addPlace() {
        if (this.newPlace.trim() !== '') {
          this.favoritePlaces.push({
            id: this.placeId++,
            name: this.newPlace.trim(),
          });
          this.newPlace = '';
        }
      },
      removePlace(id) {
        this.favoritePlaces = this.favoritePlaces.filter(place => place.id !== id);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles for the component */
  </style>
  