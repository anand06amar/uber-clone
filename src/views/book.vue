<template>
  <div class="container">
    <div id="map" class="map"></div>
    <div id="ridecontainer" class="ridecontainer">
      <!-- ride selector -->
      <!-- confirm button -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import mapboxgl from 'mapbox-gl';

export default {
  data() {
    return {
      pickupCoordinates: null,
      dropoffCoordinates: null,
    };
  },
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5hbmRhbWFyMDYiLCJhIjoiY2xpdTE5cjBzMDN3bzNzb2Nqejc0ZXkwaiJ9.qNHSWQc3SNVPt7QsGrmdaw'; // Replace with your Mapbox access token

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [75.7139, 19.7515],
      zoom: 6,
    });

    new mapboxgl.Marker()
      .setLngLat([12.554729, 55.70651])
      .addTo(map);

    this.getPickupCoordinates();
    this.getDropoffCoordinates();
  },
  methods: {
    getPickupCoordinates() {
  const pickup = 'Santa Monica';
  axios
    .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json`, {
      params: {
        access_token: 'pk.eyJ1IjoiYW5hbmRhbWFyMDYiLCJhIjoiY2xpdTE5cjBzMDN3bzNzb2Nqejc0ZXkwaiJ9.qNHSWQc3SNVPt7QsGrmdaw',
        limit: 1,
      },
    })
    .then(response => {
      this.pickupCoordinates = response.data.features[0].center;
      console.log('pickupCoordinates:', this.pickupCoordinates);
    })
    .catch(error => {
      console.error(error);
    });
},

getDropoffCoordinates() {
  const dropoff = 'Los Angeles';
  axios
    .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json`, {
      params: {
        access_token: 'pk.eyJ1IjoiYW5hbmRhbWFyMDYiLCJhIjoiY2xpdTE5cjBzMDN3bzNzb2Nqejc0ZXkwaiJ9.qNHSWQc3SNVPt7QsGrmdaw',
        limit: 1,
      },
    })
    .then(response => {
      this.dropoffCoordinates = response.data.features[0].center;
      console.log('dropoffCoordinates:', this.dropoffCoordinates);
    })
    .catch(error => {
      console.error(error);
    });
}

  },
};
</script>

<style>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f7fafc; /* Adjust the background color as per your requirements */
}

.map {
  flex: 1;
}

.ridecontainer {
  flex: 1;
}
</style>
