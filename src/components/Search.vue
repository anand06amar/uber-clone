<template>
  <div class="bg-gray-200 h-screen">
    <router-link to="/booking">
      <div class="bg-white px-4">
        <img
          class="h-12 cursor-pointer"
          src="https://img.icons8.com/ios-filled/50/000000/left.png"
        />
      </div>
    </router-link>
    <div class="bg-white flex items-center px-4 mb-2">
      <div class="flex flex-col w-10 mr-2 items-center">
        <img
          class="h-2.5"
          src="https://img.icons8.com/ios-filled/50/9CA3AF/filled-circle.png"
        />
        <img
          class="h-10"
          src="https://img.icons8.com/ios/50/9CA3AF/vertical-line.png"
        />
        <img
          class="h-3"
          src="https://img.icons8.com/windows/50/000000/square-full.png"
        />
      </div>
      <div class="flex flex-col flex-1">
        <input
          class="h-10 bg-gray-200 my-2 rounded-2 p-2 outline-none border-none"
          placeholder="Enter pickup location"
          v-model="pickuplocation"
        />
        <input
          class="h-10 bg-gray-200 my-2 rounded-2 p-2 outline-none border-none"
          placeholder="Where to?"
          v-model="dropofflocation"
        />
      </div>
      <img
        class="h-10 w-10 bg-gray-200 rounded-full ml-3"
        src="https://img.icons8.com/ios/50/000000/plus-math.png"
      />
    </div>
    <div class="bg-white flex text-l items-center px-4 py-2">
      <img
        class="rounded-full bg-gray-400 p-2 mr-2 h-10 w-10"
        src="https://img.icons8.com/ios-filled/50/ffffff/star--v1.png"
      />
      <span>Saved Places (Not available)</span>
    </div>
    <router-link
      :to="{
        path: '/confirm',
        query: { pickuplocation: pickuplocation, dropofflocation: dropofflocation }
      }"
    >
      <div class="bg-black flex text-xl items-center py-2 text-white mt-4 justify-center text-center m-12 transform hover:scale-105 transition cursor-pointer">
        Confirm Locations
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickuplocation: '',
      dropofflocation: '',
    };
  },
};
</script>

<style>
/* Add your styles here */
</style>
