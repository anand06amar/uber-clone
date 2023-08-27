<template>
    <div class="payment-container">
        <div class="payment-details-container">
            <h1>Payment Confirmation</h1>
            <div class="payment-details">
                <p><strong>Pickup Location:</strong> {{ pickupLocation }}</p>
                <p><strong>Dropoff Location:</strong> {{ dropoffLocation }}</p>
                <p><strong>Distance:</strong> {{ distance }}</p>
                <p><strong>Price:</strong> {{ price }}</p>
                <p><strong>Car:</strong> {{ carName }}</p>
            </div>
            <button class="payment-button" @click.prevent="handlePayment">Make Payment</button>
        </div>
        <div class="chatbox-container">
            <chat :driverId="driverId" :riderId="riderId" />
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import chat from '../components/Chat.vue'


const router = useRouter();

// Retrieve the query parameters from the route
const routeQuery = router.currentRoute.value.query;

const pickupLocation = ref(routeQuery.pickupLocation);
const dropoffLocation = ref(routeQuery.dropoffLocation);
const distance = ref(routeQuery.distance);
const price = ref(routeQuery.price);
const carName = ref(routeQuery.carName);

const handlePayment = async () => {
    if (!pickupLocation.value || !dropoffLocation.value || !distance.value || !price.value || !carName.value) {
        console.error("One or more query parameters are missing.");
        return;
    }

    fetch('http://localhost:8080/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            items: [
                {
                    pickupLocation: pickupLocation.value,
                    dropoffLocation: dropoffLocation.value,
                    distance: distance.value,
                    price: price.value,
                    car: carName.value,
                },
            ],
        })
    }).then(async res => {
        if (res.ok) return res.json();
        const json = await res.json();
        return await Promise.reject(json);
    }).then(({ url }) => {
        // window.open(url, '_blank');
        // console.log(selectedSeats.value)
        const stripedUrl = url.replace('http://localhost:8080/', '');

        // console.log("The payment ID is: " + id + "\n\n" + session.id);
        setTimeout(() => {
            window.location.href = stripedUrl;
        }, 1000);
    }).catch(err => {
        // console.log(payment.value)
        console.error(err);
    });
}
</script>
<style scoped>
.payment-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f8f8f8;
}

.payment-details-container,
.chatbox-container {
    max-width: 400px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    animation: fadeIn 0.5s ease;
    margin: 10px;
}

.payment-details {
    margin-top: 20px;
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 8px;
}

.payment-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #000000;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}

.payment-button:hover {
    background-color: #333333;
}

.payment-button:active {
    transform: scale(0.95);
    box-shadow: none;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>

