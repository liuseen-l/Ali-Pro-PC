<template>
  <div class="map">
    <!-- 头部区域 -->
    <MapHeader />
    <div class="map-container">
      <!-- 地图展示区域 -->
      <MapCenter></MapCenter>
      <!-- chat 和 recommand 展示区域 ，二级路由 -->
      <router-view :userKey="userKey" ></router-view>
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
  data(){
    return {
      userKey : '',
    }
  },
  mounted(){
    this.userKey = this.$route.params.userKey
  }
};
</script>
<style lang="less" scoped>
.map {
  width: 100vw;
  height: 100vh;
  min-width: 1024px;
  &-container {
    width: 100%;
    height: calc(100vh - 200px);
    display: flex;
  }
}
</style>
