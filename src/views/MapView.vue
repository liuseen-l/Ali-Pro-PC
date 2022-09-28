<template>
  <div class="map">
    <!-- 头部区域 -->
    <MapHeader></MapHeader>
    <div class="map-container">
      <MapCenter></MapCenter>
      <!-- chat 和 recommand 展示区域 ，二级路由 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MapHeader from "@/components/mapView/MapHeader.vue";
import MapCenter from "@/components/mapView/MapCenter.vue";

export default {
  name: "MapView",
  components: {
    MapHeader,
    MapCenter,
    // MapRecommand,
  },
  methods: {
    toPerson() {
      this.$router.push({
        path: "/login",
      });
    },
  },
};
</script>
<style lang="less" scoped>
.map {
  width: 100vw;
  height: 100vh;
  min-width: 1024px;
  &-container {
    width: 100%;
    height: calc(100vh - 150px);
    display: flex;
  }
}
</style>
