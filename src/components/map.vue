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

export default {
  props: {
    pickupCoordinate: {
      type: Array,
      required: true,
    },
    dropoffCoordinate: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5hbmRhbWFyMDYiLCJhIjoiY2xpdTE5cjBzMDN3bzNzb2Nqejc0ZXkwaiJ9.qNHSWQc3SNVPt7QsGrmdaw';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-96, 37.8],
      zoom: 3,
    });

    if (this.pickupCoordinate && this.dropoffCoordinate) {
      this.addToMap(map, this.pickupCoordinate, this.dropoffCoordinate);
    }
  },
  methods: {
    addToMap(map, pickupCoord, dropoffCoord) {
      // Create a default Marker for pickup and add it to the map.
      new mapboxgl.Marker().setLngLat(pickupCoord).addTo(map);

      // Create a default Marker for dropoff and add it to the map.
       new mapboxgl.Marker().setLngLat(dropoffCoord).addTo(map);

      // Add padding to the map to visualize the markers correctly
      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend(pickupCoord);
      bounds.extend(dropoffCoord);
      map.fitBounds(bounds, { padding: 100 });

      console.log('Pickup Coordinate:', pickupCoord);
      console.log('Dropoff Coordinate:', dropoffCoord);
    },
  },
};
</script>

<style scoped>
.map-container {
  height: 400px;
}
</style>