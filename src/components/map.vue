<template>
  <div class="container">
    <div id="map" class="map-container"></div>
    <div id="VehicleSelection" class="w-full">
      <div class="w-full h-2 border-t"></div>
      <div class="w-full text-center border-t-2 p-1.5 text-gray-700 text-lg font-semibold">
        <!-- Distance info -->
      </div>

      <div class="scrollSection">
        <!-- Car section 1 -->
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
  </div>
</template>


<script>
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { haversineDistance } from '../haversine.js'; // Replace with the actual path to your utility function


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
    };
  },
  mounted() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYW5hbmRhbWFyMDYiLCJhIjoiY2xpdTE5cjBzMDN3bzNzb2Nqejc0ZXkwaiJ9.qNHSWQc3SNVPt7QsGrmdaw";

    this.map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-96, 37.8],
      zoom: 6,
    });

    this.map.on("load", () => {
      this.addMapboxDirections();
      this.searchLocation();
    });
  },
  methods: {
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
  height: 100vh;
  overflow: hidden;
}

.map-container {
  height: 600px;
  width: 80%;
  margin: auto;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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
</style>