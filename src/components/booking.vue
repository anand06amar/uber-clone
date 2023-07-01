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
          <router-link to="/Search" class="actionButton primary">
            <img
              src="https://i.ibb.co/cyvcpfF/uberx.png"
              width="100"
              height="100"
            />
            <div>Ride</div></router-link
          >
          <router-link to="/Search" class="actionButton secondary"
            ><img
              src="https://i.ibb.co/cyvcpfF/uberx.png"
              width="100"
              height="100"
            />
           <span>Wheels</span></router-link
          >
  
          <router-link to="/Search" class="actionButton tertiary"
            ><img
              src="https://i.ibb.co/cyvcpfF/uberx.png"
              width="100"
              height="100"
            />
            <div>Reserve</div></router-link
          >
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
        zoom: 6,
      });
  
      new mapboxgl.Marker().setLngLat([12.554729, 55.70651]).addTo(map);
    },
  };
  </script>
  
  <style>
  .container {
    height: 100vh;
    display: flex;
    min-width: 100vw;
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
    margin-right: 2em; /* Adjust the desired spacing here */
  
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