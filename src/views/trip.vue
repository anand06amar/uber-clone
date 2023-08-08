<template>
  <div class="trips">
    <h1 class="page-title">Past Trips</h1>
    <div v-if="trips.length === 0" class="no-trips">No past trips found.</div>
    <div v-else>
      <ul class="trip-list">
        <li v-for="trip in trips" :key="trip.id" class="trip-item">
          <div class="trip-details">
            <div class="trip-date">{{ formatDate(trip.date) }}</div>
            <div class="trip-location">
              <span class="location">{{ trip.pickupLocation }}</span>
              <img class="arrow-icon" src="https://img.icons8.com/material-outlined/24/000000/arrow-right.png" />
              <span class="location">{{ trip.dropoffLocation }}</span>
            </div>
            <div class="trip-stats">
              <div class="trip-distance">Distance: {{ trip.distance }} km</div>
              <div class="trip-duration">Duration: {{ trip.duration }}</div>
              <div class="trip-fare">Fare: {{ trip.fare }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trips: [
        {
          id: 1,
          date: "2023-08-03",
          pickupLocation: "Location A",
          dropoffLocation: "Location B",
          distance: 10.5,
          duration: "25 mins",
          fare: "$20.00",
        },
        // Add more trips data here...
      ],
    };
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
</script>

<style>
/* Add your styles here */
.trips {
  padding: 20px;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.no-trips {
  font-size: 18px;
  color: #777;
  margin-bottom: 20px;
}

.trip-list {
  list-style: none;
  padding: 0;
}

.trip-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.trip-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.trip-date {
  font-size: 18px;
  font-weight: bold;
}

.trip-location {
  display: flex;
  align-items: center;
  font-size: 16px;
}

.location {
  margin: 0 5px;
}

.arrow-icon {
  width: 24px;
  height: 24px;
}

.trip-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.trip-distance,
.trip-duration,
.trip-fare {
  font-size: 14px;
  color: #555;
}
</style>
