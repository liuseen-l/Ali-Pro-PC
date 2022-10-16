<template>
  <div class="search-container">
    <div class="search-bar">
      <i @click="searchPosition" class="el-icon-search"></i>
      <input
        type="text"
        placeholder="Search"
        @input="searchPosition"
        v-model="value"
      />
      <i
        class="el-icon-close"
        @click="clearInputValue"
        :class="{ show: value.length }"
      ></i>
    </div>
    <div class="association" v-if="pois.length && value.length">
      <div
        class="association-item"
        @click="updatePosition(item)"
        v-for="item in pois"
        :key="item.id"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";

export default {
  name: "MapHeadSearch",
  data() {
    return {
      pois: [],
      value: "",
    };
  },
  methods: {
    searchPosition: _.debounce(async function () {
      const currentLongitude =
        this.$store.getters.currentLongitude; /*120.3572;*/
      const currentLatitude = this.$store.getters.currentLatitude; //36.101;
      const res = await axios.get(
        `https://restapi.amap.com/v5/place/around?key=df295ed980114633d24f5f186651247b&keywords=${this.value}&location=${currentLongitude},${currentLatitude}&radius=10000&page_size=20&page_num=1`
      );
      this.pois = res.data.pois;
    }, 500),
    updatePosition(item) {
      const { address, adname, type, location, name } = item;
      const [longitude, latitude] = location.split(",");
      const searchInfo = {
        address,
        adname,
        longitude,
        latitude,
        type,
      };
      this.$store.commit("SET_SEARCHIFO", searchInfo);
      this.pois = [];
      console.log(item);
      this.value = name;
    },
    clearInputValue() {
      this.value = "";
    },
  },
};
</script>

<style lang="less" scoped>
@font-color: #e9ecef;

.search-container {
  z-index: 1000;

  .search-bar {
    border-image-source: url("../../../assets/images/search.png");
    border-image-slice: 80 80 80 80 fill;
    border-image-width: 80px 80px 80px 80px;
    border-image-repeat: stretch;
    padding: 10px 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    .el-icon-search {
      margin: 0 5px;
      cursor: pointer;
    }

    .el-icon-close {
      visibility: hidden;
      margin-right: 10px;
      cursor: pointer;
    }
    .show {
      visibility: visible;
    }

    input {
      width: 400px;
      background: transparent;
      outline: none;
      border: none;
      color: @font-color;

      &::placeholder {
        color: @font-color;
      }
    }
  }

  .association {
    background: #0e1d51;
    opacity: 0.7;
    height: 200px;
    overflow-y: scroll;

    &-item {
      padding: 10px 10px;
      &:hover {
        cursor: pointer;
        background: #0d2b61;
      }
    }

    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background: #376da2;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: #1b3071;
    }
  }
}
</style>
