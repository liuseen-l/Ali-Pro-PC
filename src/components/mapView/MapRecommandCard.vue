<template>
  <div class="map-recommand-card">
    <div class="recommand-item">
      <div class="item-left">
        <div class="recommand-img">
          <el-image class="img-item" :src="url" fit="fill"></el-image>
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
        <div class="recommand-addtress"><i class="el-icon-location-information"></i>
          {{data.location}}</div>
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
      url: 'https://dd-static.jd.com/ddimg/jfs/t1/21848/11/20098/43348/633658f5E1fa049a1/66dd6f1e5c6a17a8.jpg',
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.map-recommand-card {
  margin: 0 32px 16px;
  .recommand-item {
    background-image: linear-gradient(#000000aa 10%, transparent);
    padding: 16px;
    color: white;
    position: relative;
    border: 10px solid transparent;
    background-clip: padding-box;
    display: flex;
    .recommand-title {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 10px;
      .title-name {
        font-weight: 700;
        font-size: 18px;
        margin-right: 20px;
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
      font-size: 16px;
      margin-bottom: 10px;
    }
    .recommand-rate {
      font-size: 14px;
      margin-bottom: 10px;
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
        margin-right: 6px;
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
    .recommand-img {
      .img-item {
        width: 100px;
        height: 120px;
        margin-right: 24px;
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