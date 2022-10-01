<template>
  <div class="map-recommand">
    <div class="content">
      <div class="content-header">
        <button class="custom-btn btn-3 active"><span>热门地点</span></button>
        <button class="custom-btn btn-3"><span>周边推荐</span></button>
        <button class="custom-btn btn-3"><span>聊天室</span></button>
      </div>
      <div class="content-body">
        <div class="recommand-list">
          <el-scrollbar style="height:100%">
            <map-recommand-card v-for="(item,index) in recommandPlaces" :key="index" :data="item">
            </map-recommand-card>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MapRecommandCard from '@/components/mapView/MapRecommandCard';
export default {
  name: 'MapCenter',
  components: {
    MapRecommandCard,
  },
  data() {
    return {
      activeName: 'first',
      recommandPlaces: [
        {
          title: '四季酒店（五山店）',
          location: '北京市朝阳区酒仙桥路102号(地铁朝阳门站D口直行500m)',
          hot: 5,
          score: '4.6',
          tags: ['预约发票', '近核酸点', '近地铁'],
        },
        {
          title: '四季酒店（五山店）',
          location: '北京市朝阳区酒仙桥路102号(地铁朝阳门站D口直行500m)',
          hot: 5,
          score: '4.6',
          tags: ['预约发票', '近核酸点', '近地铁'],
        },
        {
          title: '四季酒店（五山店）',
          location: '北京市朝阳区酒仙桥路102号(地铁朝阳门站D口直行500m)',
          hot: 4,
          score: '4.6',
          tags: ['预约发票', '近核酸点', '近地铁'],
        },
        {
          title: '四季酒店（五山店）',
          location: '北京市朝阳区酒仙桥路102号(地铁朝阳门站D口直行500m)',
          hot: 4,
          score: '4.6',
          tags: ['预约发票', '近核酸点', '近地铁'],
        },
        {
          title: '四季酒店（五山店）',
          location: '北京市朝阳区酒仙桥路102号(地铁朝阳门站D口直行500m)',
          hot: 3,
          score: '4.6',
          tags: ['预约发票', '近核酸点', '近地铁'],
        },
      ],
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
  background: #0d2b61 url('~@/assets/images/recommend_bg.png') no-repeat;
  background-size: 98% 98%;
  background-position: center;
  padding: 40px;
  .content {
    display: flex;
    flex-direction: column;
    height: 100%;
    .content-header {
      padding-left: 1%;
      .custom-btn {
        width: 130px;
        height: 40px;
        color: #fff;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
        padding: 10px 25px;
        font-family: 'Lato', sans-serif;
        font-weight: 500;
        font-size: 16px;
        background: transparent;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        display: inline-block;
        box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
          inset -7px -7px 10px 0px rgba(0, 0, 0, 0.1),
          7px 7px 20px 0px rgba(0, 0, 0, 0.1),
          4px 4px 5px 0px rgba(0, 0, 0, 0.1);
        text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.5),
          -4px -4px 6px rgba(116, 125, 136, 0.2);
        outline: none;
      }
      .btn-3 {
        color: #fff;
        background: #689ee9;
        width: 130px;
        height: 40px;
        line-height: 42px;
        padding: 0;
        border: none;
      }
      .active {
        background: #0d2b61;
      }
      .btn-3 span {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
      }

      .btn-3:before,
      .btn-3:after {
        position: absolute;
        content: '';
        right: 0;
        top: 0;
        background: rgba(2, 126, 251, 1);
        transition: all 0.3s ease;
      }

      .btn-3:before {
        height: 0%;
        width: 2px;
      }

      .btn-3:after {
        width: 0%;
        height: 2px;
      }

      .btn-3:hover {
        background: transparent;
        box-shadow: none;
      }

      .btn-3:hover:before {
        height: 100%;
      }

      .btn-3:hover:after {
        width: 100%;
      }

      .btn-3 span:hover {
        color: rgba(2, 126, 251, 1);
      }

      .btn-3 span:before,
      .btn-3 span:after {
        position: absolute;
        content: '';
        left: 0;
        bottom: 0;
        background: rgba(2, 126, 251, 1);
        transition: all 0.3s ease;
      }

      .btn-3 span:before {
        width: 2px;
        height: 0%;
      }

      .btn-3 span:after {
        width: 0%;
        height: 2px;
      }

      .btn-3 span:hover:before {
        height: 100%;
      }

      .btn-3 span:hover:after {
        width: 100%;
      }
    }
    .content-body {
      height: 100%;
      box-shadow: 8px 8px 8px #000;
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      &::before {
        content: '';
        background-image: conic-gradient(#689ee9 20deg, transparent 120deg);
        width: 150%;
        height: 150%;
        position: absolute;
        animation: rotate 5s linear infinite;
        z-index: 1;
      }
      &::after {
        content: '';
        width: 98%;
        height: 99%;
        background: #0d2b61;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
        box-shadow: inset 8px 8px 16px #000;
      }
      .recommand-list {
        width: 100%;
        height: 100%;
        padding: 30px 0;
        position: relative;
        z-index: 3;
        display: flex;
        flex-direction: column;
        /deep/ .el-scrollbar {
          .el-scrollbar__wrap {
            overflow-x: hidden;
            margin-right: -21px !important;
          }
        }
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
