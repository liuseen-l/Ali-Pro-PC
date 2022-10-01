<template>
  <div class="right">
    <div class="right-top">
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
        <span @click="toRegister">注册</span>
        <button class="btn-login" @click="toLogin">登录</button>
      </div>
    </div>
    <div class="right-bottom">
      <HeadItem :count="299" :name="'在线人数'" />
      <HeadItem :count="'🔥'" :name="'图书馆'" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import HeadItem from "./HeadItem.vue";

export default {
  name: "MapHeadRight",
  components: {
    HeadItem,
  },
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
    async getWeather() {
      const res = await axios.get(
        `https://restapi.amap.com/v3/weather/weatherInfo?key=ef91921fa920d778673005eaacb44836&city=${this.cid}`
      );
      // console.log(res.data.lives[0]);
      const weatherInfo = res.data.lives[0];
      this.weather = weatherInfo.weather;
      this.temperature = weatherInfo.temperature + " ℃";
    },
    getHours() {
      this.hours = new Date().getHours();
    },
    getMinutes() {
      const minutes = new Date().getMinutes();
      this.minutes = minutes >= 10 ? minutes : "0" + minutes;
    },
    toLogin() {
      this.$router.push("/person/login");
    },
    toRegister() {
      this.$router.push("/person/register");
    },
  },
};
</script>

<style lang="less" scoped>
@font-color: #e9ecef;
@cyan: #00e6f6;

@--slice-0: inset(50% 50%, 50%, 50%);
@--slice-1: inset(80%, -3px 0 0);
@--slice-2: inset(50% -3px 30% 0);
@--slice-3: inset(10% -3px 85% 0);
@--slice-4: inset(40% -3px 43% 0);
@--slice-5: inset(80% -3px 5% 0);

.right {
  display: flex;
  flex-direction: column;
  align-items: center;

  .right-top {
    display: flex;
    align-items: center;
    gap: 40px;
    font-size: 1.05rem;
    color: @font-color;
    margin-top: 20px;
    margin-bottom: 5px;

    .user-info {
      display: flex;
      align-items: center;

      .avatar {
        width: 40px;
        height: 40px;
        margin: 0 10px;
      }
    }

    .visitor-status {
      display: flex;
      align-items: center;
      gap: 20px;

      span {
        cursor: pointer;
      }

      .btn-login,
      .btn-login::after {
        cursor: pointer;
        padding: 6px 18px;
        color: @font-color;
        font-weight: 600;
        border: 0;
        background: linear-gradient(45deg, transparent 5%, #ff013c 5%);
        letter-spacing: 3px;
        box-shadow: 3px 0 0 @cyan;
        outline: transparent;
        position: relative;
      }

      .btn-login::after {
        content: "登录";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        background: linear-gradient(
          45deg,
          transparent 3%,
          @cyan 3%,
          @cyan 5%,
          #ff013c 5%
        );
        text-shadow: -0.5px -0.5px 0px #f8f005, 0.5px 0.5px 0px #00e6f6;
        clip-path: @--slice-0;
      }

      .btn-login:hover::after {
        animation: 1s glitch;
        animation-timing-function: steps(2, end);
      }

      @keyframes glitch {
        0% {
          clip-path: @--slice-1;
          transform: translate(-2px, -2px);
        }
        10% {
          clip-path: @--slice-3;
          transform: translate(2px, 2px);
        }
        20% {
          clip-path: @--slice-1;
          transform: translate(-2px, 2px);
        }
        30% {
          clip-path: @--slice-3;
          transform: translate(0px, 2px);
        }
        40% {
          clip-path: @--slice-2;
          transform: translate(-2px, 0px);
        }

        50% {
          clip-path: @--slice-3;
          transform: translate(2px, 0px);
        }

        60% {
          clip-path: @--slice-4;
          transform: translate(2px, 4px);
        }

        70% {
          clip-path: @--slice-2;
          transform: translate(-5px, 5px);
        }

        80% {
          clip-path: @--slice-5;
          transform: translate(10px, -5px);
        }

        90% {
          clip-path: @--slice-1;
          transform: translate(-5px, 0px);
        }

        100% {
          clip-path: @--slice-1;
          transform: translate(0);
        }
      }
    }

    i {
      font-size: 1.25rem;
    }
  }

  .right-bottom {
    display: flex;
    gap: 20px;
  }
}
</style>