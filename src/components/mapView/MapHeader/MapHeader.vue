<template>
  <div class="header">
    <div class="left">
      <MapHeadLogo />
      <MapHeadPositionCount />
    </div>
    <div class="center">
      <MapHeadTitle />
      <MapHeadSearch />
    </div>
    <MapHeadRight />
  </div>
</template>

<script>
import MapHeadRight from './MapHeadRight.vue';
import MapHeadLogo from './MapHeadLogo.vue';
import MapHeadPositionCount from './MapHeadPositionCount.vue';
import MapHeadTitle from './MapHeadTitle.vue';
import MapHeadSearch from './MapHeadSearch.vue';

export default {
  name: 'MapHeader',
  components: {
    MapHeadLogo,
    MapHeadPositionCount,
    MapHeadRight,
    MapHeadTitle,
    MapHeadSearch,
  },
};
</script>
<style lang="less" scoped>
@font-color: #e9ecef;

.header {
  max-width: 100%;
  height: 138px;
  // background: linear-gradient(#081a3c, #0d2b61);
  background: url('~@/assets/images/head_bg.png') no-repeat;
  // background-size: 98% 98%;
  background-position: center bottom;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  color: @font-color;
  padding: 0 20px;

  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
