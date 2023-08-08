<template>
    <div class="header">
        Confirm Your Ride
    </div>
    <div id="map" class="map-container"></div>
    <div id="VehicleSelection" class="w-full">
        <div class="w-full h-2 border-t"></div>
        <div class="w-full text-center border-t-2 p-1.5 text-gray-700 text-lg font-semibold"></div>
        <div class="scrollSection">
            <transition-group name="fade" mode="out-in">
                <router-link v-for="vehicle in vehicles" :key="vehicle.id" :to="`/vehicle/${vehicle.id}`"
                    class="vehicle-card-link">
                    <div class="vehicle-card">
                        <img class="vehicle-image" :src="vehicle.image" alt="Vehicle Image">
                        <div class="vehicle-details">
                            <div class="vehicle-name">{{ vehicle.name }}</div>
                            <div class="vehicle-description">{{ vehicle.description }}</div>
                            <div class="vehicle-price">{{ vehicle.price }}</div>
                            <div class="vehicle-duration">{{ vehicle.duration }}</div>
                            <div class="vehicle-seats">
                                <i class="fas fa-users"></i> {{ vehicle.seats }} seats
                            </div>
                        </div>
                    </div>
                </router-link>
            </transition-group>
        </div>
    </div>
</template>
<script>
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

export default {
    name: "VehicleSlelection",

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
            // vehicles: [
            //     {
            //         id: 1,
            //         name: "UberX",
            //         image: "img/uber/ride.png",
            //         description: "Economical and efficient",
            //         price: "£200",
            //         duration: "7 hours",
            //         seats: 4
            //     },


            // ]
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
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
    /* Prevent scrollbars */
}

.map-container {
    height: 600px;
    /* Adjust the height as needed */
    width: 80%;
    /* Adjust the width as needed */
    margin: auto;
    /* Center the map horizontally */
    border: 1px solid #ccc;
    /* Add a border if desired */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    /* Add shadow if desired */
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

/* Add attractive styling to the vehicle card link */
.vehicle-card-link {
    text-decoration: none;
}

/* Style for the vehicle card */
.vehicle-card {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    margin-bottom: 1rem;
    cursor: pointer;
}

.vehicle-card:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.vehicle-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 10px;
}

.vehicle-details {
    margin-left: 1rem;
}

.vehicle-name {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.vehicle-description {
    font-size: 1rem;
    color: #7f8c8d;
    margin-bottom: 0.5rem;
}

.vehicle-price {
    font-size: 1.25rem;
    color: #3498db;
    margin-bottom: 0.5rem;
}

.vehicle-duration {
    font-size: 1rem;
    color: #7f8c8d;
    margin-bottom: 0.5rem;
}

.vehicle-seats {
    font-size: 1rem;
    color: #7f8c8d;
    display: flex;
    align-items: center;
}

.vehicle-seats i {
    margin-right: 0.5rem;
}
</style>