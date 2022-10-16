<template>
  <div class="map-recommand-card" @click="chat">
    <div class="recommand-item">
      <div class="item-left">
        <div class="recommand-img">
          <el-image
            class="img-item"
            v-if="data.photos.length > 0"
            :src="data.photos[0].url"
            fit="fill"
          >
          </el-image>
          <el-image v-else class="img-item" fit="fill"> </el-image>
        </div>
      </div>
      <div class="item-right">
        <div class="recommand-title">
          <div class="title-name">{{ data.name }}</div>
          <div class="title-hot">
            火爆值：
            <i
              v-for="(num, idx) in 4"
              :key="idx"
              class="iconfont icon-fire"
              style="color: red"
            ></i>
          </div>
        </div>
        <el-tooltip
          effect="dark"
          :content="address"
          :disabled="showTip"
          placement="left"
        >
          <div
            class="recommand-addtress"
            @mouseover="locationMouseOver(`${data.location}-index`)"
          >
            <i class="el-icon-location-information"></i>
            <span :ref="`${data.location}-index`">
              {{ address }}（距离：{{ data.distance }}m）</span
            >
          </div>
        </el-tooltip>
        <div class="recommand-rate">
          <span>4.6分</span>
          <i class="iconfont icon-star-fill"></i>
          <i class="iconfont icon-star-fill"></i>
          <i class="iconfont icon-star-fill"></i>
          <i class="iconfont icon-star-fill"></i>
          <i class="iconfont icon-star"></i>
        </div>
        <div class="recommand-tags">
          <el-tag
            size="mini"
            type="danger"
            effect="plain"
            class="custom-tag tag-red"
            >百亿补贴
          </el-tag>
          <template v-if="type == 'restaurant'">
            <el-tag
              v-for="(ele, i) in tagsRestuarant"
              :key="i"
              size="mini"
              type="info"
              effect="plain"
              class="custom-tag tag-white"
              >{{ ele }}</el-tag
            >
          </template>
          <template v-if="type == 'scenery'">
            <el-tag
              v-for="(ele, i) in tagsScenery"
              :key="i"
              size="mini"
              type="info"
              effect="plain"
              class="custom-tag tag-white"
              >{{ ele }}</el-tag
            >
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MapRecommandCard",
  props: {
    data: { type: Object, default: () => {} },
    type: { type: String, default: "" },
  },
  data() {
    return {
      showTip: false,
      address: `${this.data.pname}${this.data.cityname}${this.data.adname}${this.data.address}距离：${this.data.distance}m）`,
      tagsRestuarant: ["满30减5", "人气榜top5"],
      tagsScenery: ["5A级", "可预订", "需换票", "必去榜top5"],
    };
  },

  mounted() {},
  computed: {
    //获取聊天信息，监听数据变化
    theChatRoom: function () {
      return this.$store.getters.theChatRoom;
    }
  },
  methods: {
    // 当地址过长时显示提示
    locationMouseOver(name) {
      const tag = this.$refs[name];
      const parentWidth = tag.parentNode.offsetWidth;
      const contentWidth = tag.offsetWidth;
      this.showTip = contentWidth <= parentWidth;
    },
    chat(){
      let chatroom = this.theChatRoom;
      let name = this.data.name;
      let localStorageArr = JSON.parse(localStorage.getItem("UserArray"));
      let username = localStorageArr[0];
      let indexOF ;
      chatroom.map((item, index) => {
        if(item.roomName == name ){
          item.Members.push({userName:username})
          this.$store.commit("theChatRoom_add_member",{userName:username},index)
          this.$store.commit("SET_OPENCHAT",item)
          indexOF = true
        }
      })
      if(indexOF){
        this.$store.commit("SET_TAB", 3);
        return 
      }else{
        let data = {
            roomId:name,       //聊天室ID
            roomName:name,  //聊天室名称
        //聊天室成员
        Members:[{
          userName: username,
        }],
        //历史消息
        Message_history:[]
      }
        this.$store.commit("SET_OPENCHAT",data)
        this.$store.commit("ADD_THECHATROOM", data);
        this.$store.commit("SET_TAB", 3);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.map-recommand-card {
  margin: 0 32px 16px;
  .recommand-item {
    background-image: linear-gradient(#000000aa 10%, transparent);
    padding: 8px 16px 4px;
    color: white;
    position: relative;
    border: 10px solid transparent;
    background-clip: padding-box;
    display: flex;
    .item-left {
      width: 90px;
      margin-right: 24px;
      .recommand-img {
        .img-item {
          width: 90px;
          height: 110px;
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
          font-size: 16px;
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
          content: "";
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
          content: "";
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
    content: "";
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
