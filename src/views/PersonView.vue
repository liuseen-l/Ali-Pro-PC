<template>
  <div class="map">
    <button @click="toMap">切换</button>
    <span>PerSoneView</span>
  </div>
</template>

<script>
export default {
  name: "MapView",
  methods: {
    toMap() {
      this.$router.push({
        path: "/map",
      });
    },
  },
};
</script>
