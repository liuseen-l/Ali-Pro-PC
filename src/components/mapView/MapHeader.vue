<template>
  <div class="header">
    <div class="header__logo">
      <img
        src="../../assets/images/alibabagroup.svg"
        alt="alibaba-group-logo"
      />
    </div>
    <div class="header__info">
      <div class="time">
        <i class="el-icon-time"></i>
        {{ `${hours}:${minutes}` }}
      </div>
      <div class="weather">
        <i v-if="weather === '晴'" class="el-icon-sunny"></i>
        <i
          v-else-if="weather.match(/雨/) !== null"
          class="el-icon-heavy-rain"
        ></i>
        <i v-else-if="weather.match(/云/) !== null" class="el-icon-cloudy"></i>
        <i v-else class="el-icon-cloudy-and-sunny"></i>
        {{ temperature }}
      </div>
      <div class="user-info" v-if="isLogin">
        Hi: {{ username }}
        <!-- <i class="el-icon-user"></i> -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="avatar"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
      <div class="visitor-status" v-else>
        <!-- TODO 注册路由跳转 -->
        <span>注册</span>
        <button class="btn-login" @click="$router.push('/login')">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MapHeader",
  data() {
    return {
      isLogin: false,
      username: "ha0ran",
      ip: "",
      cid: "", // 城市的adcode(区域编码)
      weather: "", // 天气
      temperature: "正在获取...", // 气温
      hours: "",
      minutes: "",
    };
  },
  computed: {},
  mounted() {
    /* eslint-disable */
    // 这里 returnCitySN 是从 idnex.html 中 script 标签外部引入的src中获取到的
    this.ip = returnCitySN["cip"];
    this.cid = returnCitySN["cid"];
    this.getHours();
    this.getMinutes();
    const vm = this;
    let timer = null;
    timer = setTimeout(function run() {
      clearTimeout(timer);
      vm.getHours();
      vm.getMinutes();
      timer = setTimeout(run, 10000);
    }, 10000);
  },
  watch: {
    ip: function () {
      this.getWeather();
    },
  },
  methods: {
    getWeather: async function () {
      const res = await axios.get(
        `https://restapi.amap.com/v3/weather/weatherInfo?key=ef91921fa920d778673005eaacb44836&city=${this.cid}`
      );
      // console.log(res.data.lives[0]);
      const weatherInfo = res.data.lives[0];
      this.weather = weatherInfo.weather;
      this.temperature = weatherInfo.temperature + " ℃";
    },
    getHours: function () {
      this.hours = new Date().getHours();
    },
    getMinutes: function () {
      const minutes = new Date().getMinutes();
      this.minutes = minutes >= 10 ? minutes : "0" + minutes;
    },
  },
};
</script>
<style lang="less" scoped>
@font-color: #e9ecef;

.header {
  max-width: 100%;
  height: 60px;
  background-color: #081a3c;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  &__logo {
    img {
      vertical-align: middle;
      width: 200px;
      height: 50px;
    }
  }

  &__info {
    display: flex;
    align-items: center;
    gap: 40px;
    font-size: 1.05rem;
    color: @font-color;

    .user-info {
      display: flex;
      align-items: center;

      .avatar {
        width: 40px;
        height: 40px;
      }
    }

    .visitor-status {
      display: flex;
      align-items: center;
      gap: 20px;

      span {
        cursor: pointer;
      }

      .btn-login {
        cursor: pointer;
        padding: 6px 12px;
        color: @font-color;
        border: 1px solid @font-color;
        border-radius: 5px;
        background: transparent;
      }
    }

    i {
      font-size: 1.25rem;
    }
  }
}
</style>
