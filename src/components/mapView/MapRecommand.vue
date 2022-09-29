<template>
  <div class="map-recommand">
    <div class="widget__container">
      <ul class="tabs">
        <li class="widget-tab no-select selected" data-tab="tab-one">热门地点</li>
        <li class="widget-tab no-select" data-tab="tab-two">周边推荐</li>
        <li class="widget-tab no-select" data-tab="tab-three">活跃会话</li>
      </ul>
      <div class="tab-page visible" data-tab="tab-one-seg">
        <div class="content">
          <h2 class="subtitle">Sub 1</h2>
          <div class="placeholder">image goes here</div>
          <p class="description">Description of sub</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapCenter',
  data() {
    return {
      activeName: 'first',
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
<style lang="less" scoped>
.map-recommand {
  width: 35%;
  height: 100%;
  background: rgb(13, 43, 97) url('~@/assets/images/recommend_bg.png') no-repeat;
  background-size: 98% 98%;
  background-position: center;
  padding: 30px;
  .widget__container {
    color: white;
    margin: 0 auto;
    max-width: 1130px;
    .tabs {
      margin: 0;
      padding: 0;
      .widget-tab {
        -webkit-border-top-left-radius: 10px;
        -moz-border-top-left-radius: 10px;
        -ms-border-top-left-radius: 10px;
        border-top-left-radius: 10px;
        -webkit-border-top-right-radius: 10px;
        -moz-border-top-right-radius: 10px;
        -ms-border-top-right-radius: 10px;
        border-top-right-radius: 10px;
        -webkit-border-bottom-right-radius: 0;
        -moz-border-bottom-right-radius: 0;
        -ms-border-bottom-right-radius: 0;
        border-bottom-right-radius: 0;
        -webkit-border-bottom-left-radius: 0;
        -moz-border-bottom-left-radius: 0;
        -ms-border-bottom-left-radius: 0;
        border-bottom-left-radius: 0;
        background-color: #eeeeee;
        border: 1px solid #9b9b9b;
        border-bottom: none;
        color: rgb(13, 43, 97);
        cursor: pointer;
        display: inline-block;
        height: 20px;
        padding: 10px 20px;
      }
      .selected {
        background-color: transparent;
        color: #fff;
      }
    }
    .tab-page {
      -webkit-border-top-left-radius: 0;
      -moz-border-top-left-radius: 0;
      -ms-border-top-left-radius: 0;
      border-top-left-radius: 0;
      -webkit-border-top-right-radius: 10px;
      -moz-border-top-right-radius: 10px;
      -ms-border-top-right-radius: 10px;
      border-top-right-radius: 10px;
      -webkit-border-bottom-right-radius: 10px;
      -moz-border-bottom-right-radius: 10px;
      -ms-border-bottom-right-radius: 10px;
      border-bottom-right-radius: 10px;
      -webkit-border-bottom-left-radius: 10px;
      -moz-border-bottom-left-radius: 10px;
      -ms-border-bottom-left-radius: 10px;
      border-bottom-left-radius: 10px;
      background-color: white;
      border: 1px solid #c0c0c0;
      height: 100%;
      z-index: 1;
      .content {
        display: inline-block;
        margin: 0 auto;
        text-align: center;
        width: 33%;
      }
    }
  }
}
</style>
