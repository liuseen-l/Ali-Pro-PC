<template>
  <div class="map">
    <button @click="toPerson">切换</button>
    <span>MapView</span>
  </div>
</template>

<script>
export default {
  name: "MapView",
  methods: {
    toPerson() {
      this.$router.push({
        path: "/login",
      });
    },
  },
};
</script>
