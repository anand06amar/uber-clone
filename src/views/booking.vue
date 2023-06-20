<template>
    <div>
      <div ref="map" style="width: 100%; height: 500px;"></div>
    </div>
  </template>
  
  <script>
  import mapboxgl from 'mapbox-gl';
  
  export default {
    name: 'Map',
    mounted() {
      mapboxgl.accessToken = 'pk.eyJ1IjoiYW5hbmRhbWFyMDYiLCJhIjoiY2xpdTE5cjBzMDN3bzNzb2Nqejc0ZXkwaiJ9.qNHSWQc3SNVPt7QsGrmdaw';
       new mapboxgl.Map({
        container: this.$refs.map,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [75.7139, 19.7515],
        zoom: 10,
      });
      
      // Customize the map according to your requirements
      // Add markers, routes, and other interactive elements
    },
  };
  </script>
  
  <style scoped>
  #map {
    border: 1px solid #ddd;
  }
  </style>
  