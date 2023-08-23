<template>
    <div>
        <MapPage />
        <chatpage />


    </div>
</template>
  
<script>
import MapPage from "../components/drivermap.vue";
import chatpage from '../components/Chat.vue'
export default {
    components: {
        MapPage,
        chatpage,
    },
};
</script>
  