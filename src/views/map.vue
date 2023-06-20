<template>
  <div class="container">
    <div id="map" class="map"></div>
    <div id="actionItem" class="actionItem">
      <img src="../assets/uber_logo.png" alt="logo" class="logo" />
      <header>
        <profile class="profile">
          <name class="name"></name>
        </profile>
      </header>
      <div class="actionButtons">
        <router-link to="/ride" class="actionButton primary">Ride</router-link>
        <button class="actionButton secondary">Wheels</button>
        <button class="actionButton tertiary">Reserve</button>
      </div>
      <div class="whereTo">
        <inputbutton class="whereToButton">
          Where to?
        </inputbutton>
      </div>
    </div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';

export default {
  mounted() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiYW5hbmRhbWFyMDYiLCJhIjoiY2xpdTE5cjBzMDN3bzNzb2Nqejc0ZXkwaiJ9.qNHSWQc3SNVPt7QsGrmdaw'; // Replace with your Mapbox access token
    new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 12,
    });
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
  text-align: left;
  flex: 1;
  width: 100%;
}

.actionItem {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Add this line to vertically align the logo and header */
}

.logo {
  height: 100px; /* Adjust the height as per your requirements */
 
  
}


.profile {
  display: flex;
  justify-content: flex-end; /* Align the profile to the right */
}

.name {
  font-size: 24px; /* Adjust the font size as per your requirements */
}

.actionButtons {
  display: flex;
  margin-top: 2rem; /* Adjust the margin as per your requirements */
}

.actionButton {

  flex: 1;
  height: 60px; /* Adjust the height as per your requirements */
  color:black;
  border: none;
  padding: 70px;
  margin-right: 10px;
  transition: background-color 0.3s, color 0.3s;
}

.actionButton:last-child {
  margin-right: 0;
}

.actionButton:hover {

  background-color: grey;
  cursor: pointer;
}

.whereTo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px; /* Adjust the height as per your requirements */
  background-color: #ffffff; /* Adjust the background color as per your requirements */
  color: #4b5563; /* Adjust the text color as per your requirements */
  font-size: 24px; /* Adjust the font size as per your requirements */
  padding: 1rem; /* Adjust the padding as per your requirements */
  margin-top: 2rem; /* Adjust the margin as per your requirements */
  border-radius: 0.3rem; /* Adjust the border radius as per your requirements */
}

.whereToButton {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
</style>
