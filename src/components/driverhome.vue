<template>
    <div class="driver-homepage">
        <header class="header">
            <h1>Driver Dashboard</h1>
            <div class="profile">
                <!-- <img src="path_to_profile_image.jpg" alt="Profile" class="profile-image" /> -->
                <span class="profile-name">John Doe</span>
            </div>
        </header>
        <section class="main-content">
            <div class="requests">
                <h2>Requests</h2>
                <ul class="request-list">
                    <li v-for="(request, index) in rideRequests" :key="index" class="request-item">
                        <div class="request-details">
                            <p>{{ request.pickup }} to {{ request.dropoff }}</p>
                            <p>Date: {{ request.date }}</p>
                            <p>Time: {{ request.time }}</p>
                        </div>
                        <div class="request-actions">
                            <button @click="acceptRide(index)" class="accept-button">Accept</button>
                            <button @click="rejectRide(index)" class="reject-button">Reject</button>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="map">
                <!-- Add map component here -->
            </div>
        </section>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { useRouter } from 'vue-router';
const rideRequests = ref([]);
const router = useRouter();

const acceptRide = async (index) => {
    const acceptedRequest = rideRequests.value[index];
    const documentRef = doc(db, 'Requests', acceptedRequest.id);

    try {
        await updateDoc(documentRef, { Status: 'approved' });
        console.log('Ride request approved:', acceptedRequest);
        rideRequests.value.splice(index, 1);

        // Pass only the pickup information as the query parameter
        router.push({
            name: 'ride-map',
            query: {
                pickuplocation: acceptedRequest.pickup, // Only pass the pickup location
            }
        });
    } catch (error) {
        console.error('Error updating document:', error);
    }
};



const rejectRide = async (index) => {
    const rejectedRequest = rideRequests.value[index];
    const documentRef = doc(db, 'Requests', rejectedRequest.id);

    try {
        await updateDoc(documentRef, { Status: 'rejected' });
        console.log('Ride request rejected:', rejectedRequest);
        rideRequests.value.splice(index, 1);

        // Notify the rider by updating the status on the rider's side
        await updateDoc(doc(db, 'Requests', rejectedRequest.id), { Status: 'rejected' });

    } catch (error) {
        console.error('Error updating document:', error);
    }
};


// Fetch ride requests from Firestore
onMounted(async () => {
    const querySnapshot = await getDocs(collection(db, 'Requests'));

    if (!querySnapshot.empty) {
        rideRequests.value = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        })).filter(request => request.Status === 'pending'); // Filter out rejected or approved requests
    } else {
        console.log('No ride requests');
    }
});
</script>
  
<style scoped>
/* Global Styles */
body {
    margin: 0;
    font-family: Arial, sans-serif;
}

/* Header Styles */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #333;
    color: white;
}

.profile {
    display: flex;
    align-items: center;
    gap: 10px;
}

/* .profile-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
} */

/* Main Content Styles */
.main-content {
    display: flex;
}

.requests {
    flex: 1;
    padding: 20px;
}

.request-list {
    list-style: none;
    padding: 0;
}

.request-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #ddd;
    margin-bottom: 10px;
}

.request-details {
    flex: 1;
}

.request-actions {
    display: flex;
    gap: 10px;
}

.accept-button,
.reject-button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 12px;
    color: white;
}

.accept-button {
    background-color: #4caf50;
}

.reject-button {
    background-color: #f44336;
}

.map {
    flex: 1;
    border-left: 1px solid #ddd;
    padding: 20px;
}

/* Responsive Styles */
@media (max-width: 768px) {
    .main-content {
        flex-direction: column;
    }

    .map {
        border-left: none;
        border-top: 1px solid #ddd;
        margin-top: 20px;
    }
}
</style>