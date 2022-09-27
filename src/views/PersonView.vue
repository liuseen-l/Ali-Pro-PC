<template>
  <div class="person">
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

<style lang="less" scoped>
.person {
  height: 100vh;
  width: 100vw;
  background-color: red;
}
</style>
