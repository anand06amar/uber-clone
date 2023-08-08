<template>
  <div id="map" class="map-container"></div>
  <div id="VehicleSelection" class="w-full">
    <div class="w-full h-2 border-t"></div>
    <div class="w-full text-center border-t-2 p-1.5 text-gray-700 text-lg font-semibold">

    </div>
    <div class="scrollSection">
      <div class="bg-custom-gray">
        <div class="flex items-center px-4 py-5">
          <img width="75" src="img/uber/ride.png">
          <div class="w-full ml-3">
            <div class="flex items-center justify-between">
              <div class="text-2xl mb-1">UberX</div>
              <div class="text-xl">£200</div>
            </div>
            <div class="text-gray-500">7 hours</div>
          </div>
        </div>
      </div>
      <div>
        <div class="flex items-center px-4 py-5">
          <img width="75" src="img/uber/comfort.png">
          <div class="w-full ml-3">
            <div class="flex items-center justify-between">
              <div class="text-2xl mb-1">Comfort</div>
              <div class="text-xl">£300</div>
            </div>
            <div class="text-gray-500">7 hours</div>
          </div>
        </div>
      </div>
      <div>
        <div class="flex items-center px-4 py-5">
          <img width="75" src="https://i.ibb.co/Xx4G91m/uberblack.png">
          <div class="w-full ml-3">
            <div class="flex items-center justify-between">
              <div class="text-2xl mb-1">Black</div>
              <div class="text-xl">£300</div>
            </div>
            <div class="text-gray-500">7 hours</div>
          </div>
        </div>
      </div>
      <div>
        <div class="flex items-center px-4 py-5">
          <img width="75" src="https://i.ibb.co/1nStPWT/uberblacksuv.png">
          <div class="w-full ml-3">
            <div class="flex items-center justify-between">
              <div class="text-2xl mb-1">Black Suv</div>
              <div class="text-xl">£300</div>
            </div>
            <div class="text-gray-500">7 hours</div>
          </div>
        </div>
      </div>
      <div>
        <div class="flex items-center px-4 py-5">
          <img width="75" src="img/uber/uberxl.png">
          <div class="w-full ml-3">
            <div class="flex items-center justify-between">
              <div class="text-2xl mb-1">UberXL</div>
              <div class="text-xl">£800</div>
            </div>
            <div class="text-gray-500">7 hours</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

export default {
  props: {
    pickuplocation: {
      type: String,
      required: true
    },
    dropofflocation: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      map: null,
      pickupCoordinate: null,
      destinationCoordinate: null,
      isPickupSelected: true,
    };
  },

  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5hbmRhbWFyMDYiLCJhIjoiY2xpdTE5cjBzMDN3bzNzb2Nqejc0ZXkwaiJ9.qNHSWQc3SNVPt7QsGrmdaw';

    // Initialize the map
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-96, 37.8],
      zoom: 6,
    });

    this.map.on('load', () => {
      // Map has loaded, you can now add markers and directions control
      this.addMapboxDirections();
      this.searchLocation();
    });
  },
  methods: {
    searchLocation() {
      if (this.$props.pickuplocation && this.$props.dropofflocation) {
        const pickupUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(this.$props.pickuplocation)}.json?access_token=${mapboxgl.accessToken}&limit=1`;
        const destinationUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(this.$props.dropofflocation)}.json?access_token=${mapboxgl.accessToken}&limit=1`;

        Promise.all([fetch(pickupUrl), fetch(destinationUrl)])
          .then(responses => Promise.all(responses.map(response => response.json())))
          .then(data => {
            const pickupData = data[0];
            const destinationData = data[1];

            if (pickupData.features && pickupData.features.length > 0 && destinationData.features && destinationData.features.length > 0) {
              const pickupCoordinates = pickupData.features[0].center;
              const destinationCoordinates = destinationData.features[0].center;

              this.setPickupCoordinate(pickupCoordinates);
              this.setDestinationCoordinate(destinationCoordinates);

              const bounds = new mapboxgl.LngLatBounds();
              bounds.extend(pickupCoordinates);
              bounds.extend(destinationCoordinates);
              this.map.fitBounds(bounds, { padding: 100 });

              this.addToMap(pickupCoordinates, destinationCoordinates);
            } else {
              console.log('No results found for the search locations.');
            }
          })
          .catch(error => {
            console.log('Error occurred while geocoding:', error);
          });
      } else {
        console.log('Please enter both pickup and destination locations to search.');
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
      // Remove existing markers if they exist
      if (this.map.getLayer('pickupMarker')) {
        this.map.removeLayer('pickupMarker');
        this.map.removeSource('pickupMarker');
      }

      if (this.map.getLayer('destinationMarker')) {
        this.map.removeLayer('destinationMarker');
        this.map.removeSource('destinationMarker');
      }

      // Create a Marker for pickup and add it to the map
      this.map.addSource('pickupMarker', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: pickupCoord,
          },
        },
      });

      this.map.addLayer({
        id: 'pickupMarker',
        source: 'pickupMarker',
        type: 'symbol',
        layout: {
          'icon-image': 'marker-15',
          'icon-size': 1.5,
        },
      });

      // Create a Marker for destination and add it to the map
      this.map.addSource('destinationMarker', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: destinationCoord,
          },
        },
      });

      this.map.addLayer({
        id: 'destinationMarker',
        source: 'destinationMarker',
        type: 'symbol',
        layout: {
          'icon-image': 'marker-15',
          'icon-size': 1.5,
        },
      });

      console.log('Pickup Coordinate:', pickupCoord);
      console.log('Destination Coordinate:', destinationCoord);
    },
    addMapboxDirections() {
      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving',
        controls: {
          inputs: false,
          instructions: false,
          profileSwitcher: false,
        },
        styles: [
          // Set the route line style
          {
            id: 'directions-route-line',
            type: 'line',
            paint: {
              'line-width': 4,
              'line-color': '#007cbf',
            },
          },
          // Set the route origin marker style
          {
            id: 'directions-origin-point',
            type: 'circle',
            paint: {
              'circle-radius': 8,
              'circle-color': '#007cbf',
            },
          },
          // Set the route destination marker style
          {
            id: 'directions-destination-point',
            type: 'circle',
            paint: {
              'circle-radius': 8,
              'circle-color': '#007cbf',
            },
          },
          // Set the route waypoint marker style
          {
            id: 'directions-waypoint-point',
            type: 'circle',
            paint: {
              'circle-radius': 6,
              'circle-color': '#007cbf',
            },
          },
        ],
      });

      this.map.addControl(directions, 'top-left');
    }
  }
};
</script>

<style scoped>
.map-container {
  height: 400px;
}
</style>
