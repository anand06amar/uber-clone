<template>
    <div class="favorites">
        <h1>Your Favorite Places</h1>
        <ul>
            <li v-for="place in favoritePlaces" :key="place.id">
                {{ place.name }} - {{ place.address }}
            </li>
        </ul>
    </div>
</template>

<script>
import { db, auth } from '../firebase.js';

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
                const user = auth.currentUser;

                console.log('User:', user);

                if (!user) {
                    console.error('User not authenticated.');
                    return;
                }

                console.log('User UID:', user.uid); // Debugging line

                const userId = user.uid;
                const userRef = db.collection('Rider').doc(userId);
                const locationsRef = userRef.collection('Locations');

                const querySnapshot = await locationsRef.get();
                this.favoritePlaces = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name,
                    address: doc.data().address,
                }));
            } catch (error) {
                console.error('Error fetching favorite places:', error);
            }
        },
    },
};
</script>
