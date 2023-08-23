<template>
    <div class="container">
        <div class="map-container" id="map"></div>
        <DriverChat :riderId="riderId" :driverId="driverId" />
    </div>
</template>
  
<script setup>
import { onMounted } from 'vue';
import mapboxgl from 'mapbox-gl';
import { useRoute } from 'vue-router';
import DriverChat from '../components/driverchat.vue';

const route = useRoute();

onMounted(async () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5hbmRhbWFyMDYiLCJhIjoiY2xpdTE5cjBzMDN3bzNzb2Nqejc0ZXkwaiJ9.qNHSWQc3SNVPt7QsGrmdaw';

    const pickupLocationName = route.query.pickuplocation;
    console.log('Pickup Location Name:', pickupLocationName);

    const [pickupLongitude, pickupLatitude] = await geocodeLocation(pickupLocationName);
    console.log('Route Query:', route.query);


    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [pickupLongitude, pickupLatitude], // Center the map on the pickup coordinates
        zoom: 12, // Adjust the zoom level as needed
    });

    // Add a marker to the map using the retrieved pickup coordinates
    if (pickupLongitude && pickupLatitude) {
        new mapboxgl.Marker().setLngLat([pickupLongitude, pickupLatitude]).addTo(map);
    }
});

async function geocodeLocation(locationName) {
    const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationName)}.json?access_token=${mapboxgl.accessToken}`
    );
    const data = await response.json();

    console.log('Geocoding API Response:', data);

    if (data.features && data.features.length > 0) {
        const coordinates = data.features[0].center;
        const [longitude, latitude] = coordinates; // Extract longitude and latitude
        return [longitude, latitude]; // Return as an array
    } else {
        console.error('No coordinates found in the geocoding response:', data);
        return null;
    }
}


</script>
  
<style scoped>
.container {
    display: flex;
    height: 100vh;
    overflow: hidden;
}

.map-container,
.chat-container {
    flex: 1;
    /* Equal distribution of space */
    height: 100%;
}

/* Additional styles for the map and chat containers */
.map-container {
    background-color: #f0f0f0;
    /* ... Other styles ... */
}

.chat-container {
    background-color: #ffffff;
    /* ... Other styles ... */
}
</style>
  