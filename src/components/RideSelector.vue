<!-- <template>
  <div class="ride-selector">
    <Title>Choose a ride, or swipe up for more</Title>
    <CarList>
      <Car  v-for="car in carList" :key="car.service">
        <img :src="car.imgUrl" :alt="car.service"/>
        <CarDetails>
          <Service>{{ car.service }}</Service>
          <Time>5 min away</Time>
        </CarDetails>
        <CarPrice>
          {{ '$' + (rideDuration.value * car.multiplier).toFixed(2) }}
        </CarPrice>
      </Car>
    </CarList>
  </div>
</template>

<script>
import { computed, reactive, watch } from 'vue';
import { carList } from '../carList';

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
  setup(props) {
    const rideDuration = reactive({ value: 0 });

    const rideDurationf = () => {
      if (props.pickupCoordinate && props.dropoffCoordinate) {
        fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${props.pickupCoordinate[0]},${props.pickupCoordinate[1]};${props.dropoffCoordinate[0]},${props.dropoffCoordinate[1]}?` +
            new URLSearchParams({
              access_token: 'pk.eyJ1IjoiYW5hbmRhbWFyMDYiLCJhIjoiY2xpdTE5cjBzMDN3bzNzb2Nqejc0ZXkwaiJ9.qNHSWQc3SNVPt7QsGrmdaw',
            })
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.routes[0]) {
              rideDuration.value = data.routes[0].duration / 100;
            }
          });
      }
    };

    watch([() => props.pickupCoordinate, () => props.dropoffCoordinate], rideDurationf, { immediate: true });

    const formattedCarList = computed(() => {
      return carList.map((car) => {
        return {
          ...car,
          totalPrice: (rideDuration.value * car.multiplier).toFixed(2),
        };
      });
    });

    return {
      rideDuration,
      formattedCarList,
      carList: carList,
      
    };
  },
};
</script>

<style scoped>
/* Add your own styles for the RideSelector component */
</style> -->
