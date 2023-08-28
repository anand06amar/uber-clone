<template>
    <div class="favorites">
        <transition name="fade" mode="out-in">
            <h1 class="favorites-title" key="title">Your Favorite Places</h1>
        </transition>
        <ul class="favorites-list">
            <transition-group name="fade" tag="ul" class="favorites-ul" mode="out-in">
                <li v-for="place in favoritePlaces" :key="place.id" class="favorites-item">
                    <div class="pickup">Pickup - {{ place.data.pickup }}</div>
                    <div class="dropoff">DropOff - {{ place.data.dropoff }}</div>
                </li>
            </transition-group>
        </ul>
    </div>
</template>
<script>
import { db } from '../firebase.js';
import { query, collection, getDocs } from 'firebase/firestore'

export default {
    data() {
        return {
            favoritePlaces: [],
        };
    },
    mounted() {
        this.fetchFavoritePlaces();
    },
    methods: {
        async fetchFavoritePlaces() {
            try {
                const user = localStorage.getItem("user").startsWith("{") ? JSON.parse(localStorage.getItem("user")) : null;

                const parentDocId = user.uid; // Replace with the actual rider document ID
                const locationsQuery = query(collection(db, 'Rider', parentDocId, 'Locations'));

                const querySnapshot = await getDocs(locationsQuery);

                const docsArray = [];
                querySnapshot.forEach((doc) => {
                    docsArray.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                console.log(docsArray)
                this.favoritePlaces = docsArray
                // thissubcollectionDocuments.value = docsArray;
            } catch (error) {
                console.error('Error fetching subcollection documents:', error);
            }
        }

    },
};
</script>
<style scoped>
/* Styles for the favorites page */
.favorites {
    padding: 2rem;
}

.favorites-title {
    font-size: 24px;
    margin-bottom: 1rem;
    text-align: center;
}

.favorites-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.favorites-item {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pickup {
    font-weight: bold;
}

/* Animation styles */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
