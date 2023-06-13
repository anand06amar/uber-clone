<template>
    <div ref="mapContainer" class="map-container"></div>
  </template>
  
  <script>
  import mapboxgl from 'mapbox-gl';
  
  export default {
    mounted() {
      mapboxgl.accessToken = 'pk.eyJ1IjoiYW5hbmRhbWFyMDYiLCJhIjoiY2xpdTE5cjBzMDN3bzNzb2Nqejc0ZXkwaiJ9.qNHSWQc3SNVPt7QsGrmdaw';
  
      this.map = new mapboxgl.Map({
        container: this.$refs.mapContainer,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [78.9629, 20.5937], // Example center coordinates
        zoom: 4// Example zoom level
      });
  
      // Add any additional map customization or interactions here
    }
  };
  </script>
  
  <style>
  .map-container {
    height: 100vh; /* Set the desired height for the map container */
  }
  </style>
  