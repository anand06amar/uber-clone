<template>
    <div class="confirm">
   
        <router-link to="/search">
          <img src="https://img.icons8.com/ios-filled/50/000000/left.png" alt="Back" />
        </router-link>
    
  
      <Map :pickupCoordinate="pickupCoordinate" :dropoffCoordinate="dropoffCoordinate" />
      <RideContainer>
        <RideSelector :pickupCoordinate="pickupCoordinate" :dropoffCoordinate="dropoffCoordinate" />
      
      </RideContainer>
    </div>
  </template>
  
  <script>
  import Map from '@/components/map.vue';
//   import RideSelector from '@/components/RideSelector.vue';
  
  export default {
    components: {
      Map,
    //   RideSelector,
    },
    data() {
      return {
        pickupCoordinate: [ -118.4912, 34.0194 ], // Replace with actual pickup coordinates
        dropoffCoordinate: [ -118.2437,34.0522  ], // Replace with actual dropoff coordinates
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your own styles for the Confirm view */
  </style>
  