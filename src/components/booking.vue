<template>
  <div class="container">
    <div class="fixed-navbar">
      <div class="back-button" @click="goBack">
        <img src="https://flaticons.net/icon.php?slug_category=mobile-application&slug_icon=left-arrow" alt="Back" />
      </div>
      <div class="uber-text">Uber</div>
      <div class="spacer"></div>

    </div>
    <div id="map" class="map-container"></div>
    <div id="actionItem" class="actionItem">
      <img src="../assets/uber_logo.png" alt="logo" class="logo" />
      <header>
        <profile class="profile">
          <name class="name"></name>
        </profile>
      </header>

      <div class="actionButtons">
        <router-link to="/Search" class="actionButton primary">
          <img src="https://i.ibb.co/cyvcpfF/uberx.png" width="100" height="100" />
          <div>Ride</div>
        </router-link>
        <!-- <router-link to="/Search" class="actionButton secondary"><img src="https://i.ibb.co/cyvcpfF/uberx.png" width="100"
            height="100" />
          <span>Wheels</span></router-link> -->

        <router-link to="/Search" class="actionButton tertiary"><img src="https://i.ibb.co/cyvcpfF/uberx.png" width="100"
            height="100" />
          <div>Reserve</div>
        </router-link>
      </div>
      <!-- <div class="whereTo">
        <inputbutton class="whereToButton"> Where to? </inputbutton>
      </div> -->
    </div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";

export default {
  mounted() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYW5hbmRhbWFyMDYiLCJhIjoiY2xpdTE5cjBzMDN3bzNzb2Nqejc0ZXkwaiJ9.qNHSWQc3SNVPt7QsGrmdaw"; // Replace with your Mapbox access token

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [75.7139, 19.7515],
      zoom: 10,
    });

    map.flyTo({
      center: [75.7139, 19.7515], // India's coordinates
      zoom: 5, // Zoom level for India
      bearing: 0,
      speed: 0.5, // Adjust the speed of the animation as needed
      curve: 1, // Easing curve for the animation
    });

    new mapboxgl.Marker().setLngLat([12.554729, 55.70651]).addTo(map);
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 120vh;
  overflow: hidden;
}


.header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #000;
  color: #fff;
  padding: 16px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  z-index: 1;
}

.map-container {
  height: 600px;
  /* Change this to your desired fixed height */
  width: 80%;
  margin: auto;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}


.actionItem {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* Add this line to vertically align the logo and header */
}

.logo {
  height: 100px;
  /* Adjust the height as per your requirements */
}

.fixed-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #000;
  color: #fff;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
}

.back-button {
  cursor: pointer;
}

.back-button img {
  width: 24px;
  height: 24px;
}

.uber-text {
  margin-left: 16px;
  /* Adjust the margin as needed */
  font-size: 20px;
  /* Adjust the font size as needed */
  font-weight: bold;
}

.spacer {
  flex: 1;
}

.profile {
  display: flex;
  justify-content: flex-end;
  /* Align the profile to the right */
}

.name {
  font-size: 24px;
  /* Adjust the font size as per your requirements */
}

.actionButtons {
  display: flex;
  justify-content: space-between;
}

.actionButton {
  flex: 1;
  padding: 15px 30px;
  background-color: #000;
  color: #fff;
  border-radius: 24px;
  text-decoration: none;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
  margin-right: 2em;
  /* Adjust the desired spacing here */

  :hover {
    --transform-scale-x: 1.05;
    --transform-scale-y: 1.05;
  }
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
  height: 60px;
  /* Adjust the height as per your requirements */
  background-color: #ffffff;
  /* Adjust the background color as per your requirements */
  color: #4b5563;
  /* Adjust the text color as per your requirements */
  font-size: 24px;
  /* Adjust the font size as per your requirements */
  padding: 1rem;
  /* Adjust the padding as per your requirements */
  margin-top: 2rem;
  /* Adjust the margin as per your requirements */
  border-radius: 0.3rem;
  /* Adjust the border radius as per your requirements */
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