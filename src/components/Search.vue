<template>
  <div class="bg-gray-200 h-screen">
    <router-link to="/booking">
      <div class="bg-white px-4">
        <img class="h-12 cursor-pointer" src="https://img.icons8.com/ios-filled/50/000000/left.png" />
      </div>
    </router-link>
    <div class="bg-white flex items-center px-4 mb-2">
      <div class="flex flex-col w-10 mr-2 items-center">
        <img class="h-2.5" src="https://img.icons8.com/ios-filled/50/9CA3AF/filled-circle.png" />
        <img class="h-10" src="https://img.icons8.com/ios/50/9CA3AF/vertical-line.png" />
        <img class="h-3" src="https://img.icons8.com/windows/50/000000/square-full.png" />
      </div>
      <div class="flex flex-col flex-1">
        <input ref="pickupInput" class="h-10 bg-gray-200 my-2 rounded-2 p-2 outline-none border-none"
          placeholder="Enter pickup location" v-model="pickuplocation" @input="fetchPickupSuggestions" />
        <div v-if="pickupSuggestions.length && showPickupSuggestions">
          <ul class="autocomplete-list">
            <li v-for="(suggestion, index) in pickupSuggestions" :key="index" @click="selectPickupSuggestion(suggestion)">
              {{ suggestion }}
            </li>
          </ul>
        </div>
        <input ref="dropoffInput" class="h-10 bg-gray-200 my-2 rounded-2 p-2 outline-none border-none"
          placeholder="Where to?" v-model="dropofflocation" @input="fetchDropoffSuggestions" />
        <div v-if="dropoffSuggestions.length && showDropoffSuggestions">
          <ul class="autocomplete-list">
            <li v-for="(suggestion, index) in dropoffSuggestions" :key="index"
              @click="selectDropoffSuggestion(suggestion)">
              {{ suggestion }}
            </li>
          </ul>
        </div>
      </div>
      <div class="h-10 w-10 bg-gray-200 rounded-full ml-3 cursor-pointer" @click="saveLocation()">
        <img class="h-6 w-6 mx-auto" src="https://img.icons8.com/ios/50/000000/plus-math.png" />
      </div>
    </div>
    <div class="bg-white flex text-l items-center px-4 py-2">
      <img class="rounded-full bg-gray-400 p-2 mr-2 h-10 w-10"
        src="https://img.icons8.com/ios-filled/50/ffffff/star--v1.png" />
      <span>Saved Places</span>
    </div>
    <router-link :to="{
      path: '/confirm',
      query: { pickuplocation: pickuplocation, dropofflocation: dropofflocation }
    }">
      <div
        class="bg-black flex text-xl items-center py-2 text-white mt-4 justify-center text-center m-12 transform hover:scale-105 transition cursor-pointer">
        Confirm Locations
      </div>
    </router-link>
  </div>
</template>


<script>

import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase.js'; // Import 'auth' from firebase.js
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      pickuplocation: "",
      dropofflocation: "",
      pickupSuggestions: [],
      dropoffSuggestions: [],
      showPickupSuggestions: true,
      showDropoffSuggestions: true,
      debounceTimer: null,
    };
  },
  methods: {
    async saveLocation() {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error('User not authenticated.');
          return;
        }

        const locationsCollection = collection(db, 'Rider', user.uid, 'Locations');

        await addDoc(locationsCollection, {
          pickup: this.pickuplocation,
          dropoff: this.dropofflocation,
        });

        Swal.fire({
          title: 'Location Saved',
          text: 'The location has been saved successfully.',
          icon: 'success',
        });
      } catch (error) {
        console.error('Error saving location:', error);
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while saving the location. Please try again.',
          icon: 'error',
        });
      }
    },

    async fetchSuggestions(query, suggestionsArray) {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            query
          )}.json?access_token=${"pk.eyJ1IjoiYW5hbmRhbWFyMDYiLCJhIjoiY2xpdTE5cjBzMDN3bzNzb2Nqejc0ZXkwaiJ9.qNHSWQc3SNVPt7QsGrmdaw"}&limit=5`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch suggestions.");
        }

        const data = await response.json();

        if (data.features && data.features.length > 0) {
          suggestionsArray.splice(0, suggestionsArray.length);
          suggestionsArray.push(
            ...data.features.map((feature) => feature.place_name)
          );
        } else {
          suggestionsArray.splice(0, suggestionsArray.length);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        // Handle the error and provide feedback to the user
      }
    },
    fetchPickupSuggestions(query) {
      this.fetchSuggestions(query, this.pickupSuggestions);
    },
    fetchDropoffSuggestions(query) {
      this.fetchSuggestions(query, this.dropoffSuggestions);
    },
    selectPickupSuggestion(suggestion) {
      this.pickuplocation = suggestion;
      this.pickupSuggestions = [];
      this.showPickupSuggestions = false;
      this.$refs.dropoffInput.focus();
    },
    selectDropoffSuggestion(suggestion) {
      this.dropofflocation = suggestion;
      this.dropoffSuggestions = [];
      this.showDropoffSuggestions = false;
      // You can add any logic here to proceed further in your application
    },
    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            this.fetchCurrentLocationName(latitude, longitude);
          },
          error => {
            console.error("Error getting current location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    },
    async fetchCurrentLocationName(latitude, longitude) {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${"pk.eyJ1IjoiYW5hbmRhbWFyMDYiLCJhIjoiY2xpdTE5cjBzMDN3bzNzb2Nqejc0ZXkwaiJ9.qNHSWQc3SNVPt7QsGrmdaw"}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch current location.");
        }

        const data = await response.json();

        if (data.features && data.features.length > 0) {
          this.pickuplocation = data.features[0].place_name;
        }
      } catch (error) {
        console.error('Error fetching current location:', error);
        // Handle the error and provide feedback to the user
      }
    },
  },
  watch: {
    pickuplocation(newValue) {
      if (newValue) {
        this.fetchPickupSuggestions(newValue);
      } else {
        this.pickupSuggestions = [];
      }
    },
    dropofflocation(newValue) {
      if (newValue) {
        this.fetchDropoffSuggestions(newValue);
      } else {
        this.dropoffSuggestions = [];
      }
    },
  },
  mounted() {
    this.getCurrentLocation();
  },
};
</script>


<style>
/* Add your styles here */
.autocomplete-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  border-top: none;
}

.autocomplete-list li {
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.autocomplete-list li:hover {
  background-color: #f0f0f0;
}
</style>
