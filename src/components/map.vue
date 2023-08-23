<template>
  <div class="container">
    <div class="fixed-navbar">
      <div class="back-button" @click="goBack">
        <img src="https://flaticons.net/icon.php?slug_category=mobile-application&slug_icon=left-arrow" alt="Back" />
      </div>
      <div class="uber-text">Uber</div>
      <div class="spacer"></div>

    </div>

    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
    <div id="map" class="map-container "></div>
    <div id="VehicleSelection" class="w-full">
      <div class="w-full h-2 border-t"></div>
      <div class="w-full text-center border-t-2 p-1.5 text-gray-700 text-lg font-semibold">
      </div>
      <div v-if="notification" class="notification">
        {{ notification }}
      </div>
      <div class="choose-ride-text">Choose Your Ride</div>
      <div class="scrollSection">
        <div class="car-item" :class="{ 'active': selectedCar === 'UberX' }" @click="selectCar('UberX')">
          <div class="car-details">
            <img width="75" src="img/uber/ride.png" alt="UberX">
            <div class="car-info">
              <div class="text-2xl mb-1">UberX</div>
              <div class="car-price">{{ Math.min(60 * distance, 10000) }}</div>
              <div class="car-time">{{ 2.5 * distance }} mins</div>
            </div>
          </div>
        </div>


        <!-- Car section 2 -->
        <div class="car-item" :class="{ 'active': selectedCar === 'Comfort' }" @click="selectCar('Comfort')">
          <div class="car-details">
            <img width="75" src="img/uber/comfort.png" alt="Comfort">
            <div class="car-info">
              <div class="text-2xl mb-1">Comfort</div>
              <div class="car-price">{{ Math.min(50 * distance, 10000) }}</div>
              <div class="car-time">{{ 2.5 * distance }} mins</div>
            </div>
          </div>
        </div>

        <!-- Repeat for other car sections -->
      </div>

      <!-- Expanded car section -->
      <div v-if="selectedCar" class="expanded-car">
        <div class="car-details">
          <!-- Car image, name, price, and time -->
        </div>
      </div>

    </div>
    <div class="fixed-confirm-button">
      <button @click="confirmRideRequest">Confirm</button>
    </div>
  </div>
</template>






<script>
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { haversineDistance } from '../haversine.js'; // Replace with the actual path to your utility function
import { db } from "../firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useRouter } from 'vue-router';
useRouter();
export default {
  props: {
    pickuplocation: {
      type: String,
      required: true,
    },
    dropofflocation: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      map: null,
      pickupCoordinate: null,
      destinationCoordinate: null,
      isPickupSelected: true,
      directionsControl: null,
      distance: null,
      selectedCar: null,
      isLoading: true,
      requests: false,
      notification: null,

    };
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false; // Turn off loading state after 3 seconds
    }, 3000);
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYW5hbmRhbWFyMDYiLCJhIjoiY2xpdTE5cjBzMDN3bzNzb2Nqejc0ZXkwaiJ9.qNHSWQc3SNVPt7QsGrmdaw";

    this.map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-96, 37.8],
      zoom: 2,
    });

    this.map.on("load", () => {
      this.addMapboxDirections();
      this.searchLocation();
    });

    this.getRideRequest();
  },
  methods: {

    async getRideRequest() {
      const querySnapshot = await getDocs(query(collection(db, 'Requests'), where('email', '==', JSON.parse(localStorage.getItem("user")).email)));

      if (querySnapshot.empty) {
        console.log("No Requests!")
      }
      else {
        querySnapshot.docs.forEach((doc) => { // Access the 'docs' property to iterate over document snapshots
          // doc.data() is a method that retrieves the data of the document
          const documentData = {
            status: doc.data().Status,
          }
          // username.value = documentData.username;
          console.log('Document ID:', doc.id, 'Data:', documentData.status);

          if (documentData.status === "rejected") {
            this.notification = "Your request has been rejected.";
          } else if (documentData.status === "approved") {
            this.$router.push('/rider-page');
          }
        });
      }
    },


    async confirmRideRequest() {
      // if (JSON.parse(localStorage.getItem("user"))?.role === "Driver") {

      // }
      try {
        const newRequest = {
          userName: JSON.parse(localStorage.getItem("user")).displayName,
          email: JSON.parse(localStorage.getItem("user")).email,
          pickup: this.pickuplocation,
          dropoff: this.dropofflocation,
          date: (new Date().getDate()).toString(),
          time: (new Date().getMilliseconds()).toString(),
          Status: "pending"
          // password: password.value,
        };

        const docRef = await addDoc(collection(db, 'Requests'), newRequest);
        localStorage.setItem('request', JSON.stringify(newRequest))
        console.log("Request created with id: ", docRef.id)

      } catch (error) {
        console.error('Error storing user data:', error);
      }
    },

    goBack() {
      // You can use Vue Router to navigate back to the Search.vue page
      this.$router.push('/Search'); // Adjust the route path as needed
    },

    searchLocation() {

      if (this.$props.pickuplocation && this.$props.dropofflocation) {
        const pickupUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          this.$props.pickuplocation
        )}.json?access_token=${mapboxgl.accessToken}&limit=1`;
        const destinationUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          this.$props.dropofflocation
        )}.json?access_token=${mapboxgl.accessToken}&limit=1`;

        Promise.all([fetch(pickupUrl), fetch(destinationUrl)])
          .then((responses) =>
            Promise.all(responses.map((response) => response.json()))
          )
          .then((data) => {
            const pickupData = data[0];
            const destinationData = data[1];

            if (
              pickupData.features &&
              pickupData.features.length > 0 &&
              destinationData.features &&
              destinationData.features.length > 0
            ) {
              const pickupCoordinates = pickupData.features[0].center;
              const destinationCoordinates =
                destinationData.features[0].center;

              this.setPickupCoordinate(pickupCoordinates);
              this.setDestinationCoordinate(destinationCoordinates);

              const bounds = new mapboxgl.LngLatBounds();
              bounds.extend(pickupCoordinates);
              bounds.extend(destinationCoordinates);
              this.map.fitBounds(bounds, { padding: 100 });

              this.addToMap(pickupCoordinates, destinationCoordinates);
            } else {
              console.log("No results found for the search locations.");
            }
          })
          .catch((error) => {
            console.log("Error occurred while geocoding:", error);
          });
      } else {
        console.log(
          "Please enter both pickup and destination locations to search."
        );
      }
    },
    setPickupCoordinate(coordinates) {
      this.pickupCoordinate = coordinates;
      this.isPickupSelected = false;
    },
    setDestinationCoordinate(coordinates) {
      this.destinationCoordinate = coordinates;
      this.isPickupSelected = true;
    },
    addToMap(pickupCoord, destinationCoord) {
      if (this.map.getLayer("pickupMarker")) {
        this.map.removeLayer("pickupMarker");
        this.map.removeSource("pickupMarker");
      }

      if (this.map.getLayer("destinationMarker")) {
        this.map.removeLayer("destinationMarker");
        this.map.removeSource("destinationMarker");
      }

      // Create a Marker for pickup and add it to the map
      this.map.addSource("pickupMarker", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: pickupCoord,
          },
        },
      });

      this.map.addLayer({
        id: "pickupMarker",
        source: "pickupMarker",
        type: "symbol",
        layout: {
          "icon-image": "marker-15",
          "icon-size": 1.5,
        },
      });

      // Create a Marker for destination and add it to the map
      this.map.addSource("destinationMarker", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: destinationCoord,
          },
        },
      });

      this.map.addLayer({
        id: "destinationMarker",
        source: "destinationMarker",
        type: "symbol",
        layout: {
          "icon-image": "marker-15",
          "icon-size": 1.5,
        },
      });

      this.showRouteDirections();
    },
    addMapboxDirections() {
      this.directionsControl = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: "metric",
        controls: {
          inputs: false,
          instructions: false,
          profileSwitcher: false,
        },
      });

      this.map.addControl(this.directionsControl, "top-left");
    },
    showRouteDirections() {
      console.log("showRouteDirections() called");

      if (this.pickupCoordinate && this.destinationCoordinate) {
        const haversineOptions = {
          unit: 'km', // You can adjust the unit as needed
        };

        const distance = haversineDistance(
          this.pickupCoordinate,
          this.destinationCoordinate,
          haversineOptions
        );

        this.distance = distance.toFixed(2); // Round to 2 decimal places
        this.directionsControl.setOrigin(this.pickupCoordinate);
        this.directionsControl.setDestination(this.destinationCoordinate);
      } else {
        console.log("Coordinates not available.");
      }
    },
    selectCar(carType) {
      this.selectedCar = this.selectedCar === carType ? null : carType;
    },


  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 120vh;
  overflow: hidden;
}

.map-container {
  height: 600px;
  /* Change this to your desired fixed height */
  width: 80%;
  margin: auto;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.choose-ride-text {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1rem 0;
  color: #333;
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

.distance-info {
  text-align: center;
  margin-top: 16px;
  font-size: 18px;
  font-weight: bold;
}

.car-item {
  padding: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
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

.logo img {
  width: 80px;
  /* Adjust the width as needed */
}

.spacer {
  flex: 1;
}

.car-item.active {
  background-color: #f3f3f3;
}

/* Styles for expanded car section */
.expanded-car {
  border-top: 2px solid #ddd;
  padding: 1rem;
  background-color: #f3f3f3;
}

.expanded-car .car-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ccc;
}

.expanded-car .car-image {
  max-width: 75px;
  margin-right: 1rem;
}

.expanded-car .car-info {
  flex: 1;
}

.expanded-car .car-price {
  font-size: 1.25rem;
  font-weight: bold;
}

.mapboxgl-directions-route-path {
  stroke: #000;
  /* Set the stroke color to black */
  stroke-width: 4px;
  /* Set the stroke width as needed */
  fill: none;
}

.expanded-car .car-time {
  font-size: 1rem;
  color: #777;
}

.fixed-confirm-button {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  display: flex;
  justify-content: center;
  width: 100%;
}

.confirm-button {
  padding: 12px 52px;
  background-color: #000000;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
}

.confirm-button:hover {
  background-color: #333333;
  /* Change the color on hover */
}

.confirm-button:active {
  transform: scale(0.95);
  /* Shrink the button on click */
  box-shadow: none;
  /* Remove box shadow on click */
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s;
}

.loading-overlay.active {
  opacity: 1;
}

.loading-overlay.inactive {
  opacity: 0;
  pointer-events: none;
}

.loading-spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }

}

.notification {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border-radius: 4px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s;
}

.notification.active {
  opacity: 1;
}

.notification.inactive {
  opacity: 0;
  pointer-events: none;
}
</style>