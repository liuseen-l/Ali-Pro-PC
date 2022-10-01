<template>
  <div class="map-recommand-card">
    <div class="recommand-item">
      <div class="item-left">
        <div class="recommand-img">
          <el-image class="img-item" :src="data.url" fit="fill"></el-image>
        </div>
      </div>
      <div class="item-right">
        <div class="recommand-title">
          <div class="title-name">{{data.title}}</div>
          <div class="title-hot">火爆值：
            <i v-for="(num,idx) in data.hot" :key="idx" class="iconfont icon-fire"
               style="color:red"></i>
          </div>
        </div>
        <el-tooltip effect="dark" :content="data.location" :disabled="showTip" placement="left">
          <div class="recommand-addtress" @mouseover="locationMouseOver(`${data.location}-index`)">
            <i class="el-icon-location-information"></i>
            <span :ref="`${data.location}-index`"> {{data.location}}</span>
          </div>
        </el-tooltip>
        <div class="recommand-rate">
          <span>{{data.score}}分</span>
          <i class="iconfont icon-star-fill "></i>
          <i class="iconfont icon-star-fill"></i>
          <i class="iconfont icon-star-fill"></i>
          <i class="iconfont icon-star-fill"></i>
          <i class="iconfont icon-star"></i>
        </div>
        <div class="recommand-tags">
          <el-tag size="small" type="danger" effect="plain" class="custom-tag tag-red">百亿补贴
          </el-tag>
          <el-tag v-for="(ele,i) in data.tags" :key="i" size="small" type="info" effect="plain"
                  class="custom-tag tag-white">{{ele}}</el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapRecommandCard',
  props: {
    data: { type: Object, default: () => {} },
  },
  data() {
    return {
      showTip: false,
    };
  },

  mounted() {},

  methods: {
    // 当地址过长时显示提示
    locationMouseOver(name) {
      const tag = this.$refs[name];
      const parentWidth = tag.parentNode.offsetWidth;
      const contentWidth = tag.offsetWidth;
      this.showTip = contentWidth <= parentWidth;
    },
  },
};
</script>

<style lang="less" scoped>
.map-recommand-card {
  margin: 0 32px 16px;
  .recommand-item {
    background-image: linear-gradient(#000000aa 10%, transparent);
    padding: 16px 16px 2px;
    color: white;
    position: relative;
    border: 10px solid transparent;
    background-clip: padding-box;
    display: flex;
    .item-left {
      width: 100px;
      margin-right: 24px;
      .recommand-img {
        .img-item {
          width: 100px;
          height: 130px;
        }
      }
    }
    .item-right {
      flex: 1;
      overflow: hidden;
      .recommand-title {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 6px;
        .title-name {
          font-weight: 700;
          font-size: 18px;
          margin-right: 8px;
        }
        .title-hot {
          font-size: 14px;
          i {
            margin-right: 1px;
            font-size: 14px;
          }
        }
      }
      .recommand-addtress {
        font-size: 14px;
        margin-bottom: 6px;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .recommand-rate {
        font-size: 14px;
        margin-bottom: 6px;
        span {
          margin-right: 5px;
        }
        i {
          color: #f4ea2a;
        }
      }
      .recommand-tags {
        .el-tag {
          background: transparent;
          margin-right: 4px;
        }
        .custom-tag {
          // height: 40px;
          background: transparent;
          transition: all 0.3s ease;
          position: relative;
          display: inline-block;
        }
        .tag-red:after {
          position: absolute;
          content: '';
          width: 0;
          height: 100%;
          top: 0;
          right: 0;
          z-index: -1;
          background-color: #da5a5a;
          transition: all 0.3s ease;
        }

        .tag-red:hover {
          color: #fff;
        }

        .tag-red:hover:after {
          left: 0;
          width: 100%;
        }
        .tag-white:after {
          position: absolute;
          content: '';
          width: 0;
          height: 100%;
          top: 0;
          right: 0;
          z-index: -1;
          background-color: #7d7d7d;
          transition: all 0.3s ease;
        }

        .tag-white:hover {
          color: #fff;
        }

        .tag-white:hover:after {
          left: 0;
          width: 100%;
        }
      }
    }
  }
  .recommand-item::after {
    right: -8px;
    top: -8px;
    position: absolute;
    z-index: 4;
    border-top: 1px dashed white;
    border-right: 1px dashed white;
  }
  .recommand-item:hover::after {
    right: -1px;
    top: -1px;
    transition: all ease-in 0.2s;
  }
  .recommand-item:hover::before {
    bottom: -1px;
    left: -1px;
    transition: all ease-in 0.2s;
  }
  .recommand-item::after,
  .recommand-item::before {
    pointer-events: none;
    content: '';
    display: block;
    position: absolute;
    width: 80%;
    height: 50%;
    transition: all ease-in 0.2s;
  }
  .recommand-item::before {
    bottom: -8px;
    left: -8px;
    border-left: 1px dashed white;
    border-bottom: 1px dashed white;
  }
}
</style>