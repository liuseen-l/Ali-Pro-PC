<!-- Mr.Liu -->
<template>
  <div class="login">
    <div :class="['login-bc', isFoucs === true ? 'login-password' : '']">
      <div class="login-bc-hand"></div>
      <div class="login-bc-hand login-bc-hand-r"></div>
      <div class="login-bc-arms">
        <div class="login-bc-arms-arm"></div>
        <div class="login-bc-arms-arm login-bc-arms-arm-r"></div>
      </div>
    </div>
    <form>
      <!-- 标题栏 -->
      <div class="login-header">
        <span>登录</span>
        <ul>
          <li>没有账号？</li>
          <li @click="toRegister">点击注册</li>
        </ul>
      </div>
      <!-- 账号输入框 -->
      <div class="login-input">
        <div v-if="flag === false">
          <input
            ref="username"
            type="text"
            name=""
            v-model="username"
            required=""
            @focus="isFoucs = true"
            @blur="isFoucs = false"
          />
          <label for="">UserName</label>
          <i
            v-show="username.length > 0"
            @click="clearInput(1)"
            class="iconfont icon-error"
          ></i>
        </div>
        <div v-else>
          <input
            type="text"
            name=""
            placeholder="手机号码"
            v-model="phone"
            required=""
            maxlength="11"
            class="login-input-phone"
            @focus="isFoucs = true"
            @blur="isFoucs = false"
          />
        </div>

        <transition enter-active-class="animate__animated animate__headShake">
          <div
            v-show="(usernameError && username.length === 0) || phoneError"
            class="login-input-error"
          >
            {{ news1 }}
          </div>
        </transition>
      </div>
      <!-- 密码输入框 -->
      <div class="login-input">
        <template v-if="flag === false">
          <input
            ref="password"
            type="password"
            name=""
            v-model="password"
            required=""
            @focus="isFoucs = true"
            @blur="isFoucs = false"
          />
          <label for="">password</label>
        </template>
        <template v-else>
          <div class="login-input-message">
            <input
              type="text"
              name=""
              placeholder="输入验证码"
              v-model="message"
              required=""
              maxlength="6"
              @focus="isFoucs = true"
              @blur="isFoucs = false"
            />
            <button ref="sendBtn" @click="sendMessage" type="button">
              {{ messageNew }}
            </button>
          </div>
        </template>

        <transition enter-active-class="animate__animated animate__headShake">
          <div
            v-show="passwordError && password.length === 0"
            class="login-input-error"
          >
            {{ news2 }}
          </div>
        </transition>
      </div>

      <!-- 记住密码 -->
      <div class="login-remember">
        <div class="login-remember-check">
          <input type="checkbox" />
          <span>记住我</span>
        </div>
        <div @click="changeWay" class="login-remember-message">
          {{ flag === false ? "短信验证登录" : "账号密码登录" }}
        </div>
      </div>
      <!-- 提交按钮 -->
      <div class="login-submit" @click="submit">Submit</div>
      <!-- 忘记密码 -->
      <div class="login-forget">已有帐号，忘记密码？</div>
      <PersonFooter />
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import PersonFooter from "@/components/personView/PersonFooter/PersonFooter.vue";
export default {
  name: "PersonLogin",
  components: {
    PersonFooter,
  },
  data() {
    return {
      isFoucs: false,
      username: "", // 账号
      password: "", // 密码
      phone: "", // 手机号码
      message: "", // 验证码
      usernameError: false,
      passwordError: false,
      phoneError: false,
      flag: false, // false 为账号密码登录 ，true 为手机验证码登录
      news1: "", // 账号错误提示
      news2: "", // 密码错误提示
      messageNew: "发送验证码", //验证码倒计时
    };
  },

  methods: {
    // 前往注册页面
    toRegister() {
      this.$router.push({
        path: "register",
      });
    },
    // 发送验证码
    sendMessage() {
      if (!isNaN(Number(this.messageNew[0]))) {
        return;
      }
      this.$refs.sendBtn.disabled = true;
      let number = 60;
      let timer = setInterval(() => {
        number--;
        if (number === 0) {
          clearInterval(timer);
          // 当验证码倒计时的时候可能切换到账号密码页面，此时dom节点没有挂载，需要判断一下
          if (this.$refs.sendBtn) {
            this.$refs.sendBtn.disabled = false;
          }
          // 如果倒计时完毕且处于账号密码界面，根据flag来设置不同的字段给予用户信息
          if (this.flag === false) {
            this.messageNew = `发送验证码`;
          } else {
            this.messageNew = `重发验证码`;
          }
        } else {
          this.messageNew = `${number} 秒后可重发`;
        }
      }, 200);
    },

    // 清除输入内容
    clearInput(judge) {
      switch (judge) {
        case 1:
          this.username = "";
          break;
      }
    },
    // 登录
    submit() {
      // 判断当前的username 和 password 是否有空
      if (this.flag === false) {
        if (this.username.length === 0 || this.password.length === 0) {
          if (this.username.length === 0 && this.password.length === 0) {
            this.usernameError = true;
            this.passwordError = true;
            this.news1 = "请输入账号!";
            this.news2 = "请输入密码!";
            this.$refs.username.focus();
          } else if (this.username.length === 0) {
            this.usernameError = true;
            this.news1 = "请输入账号!";
            this.$refs.username.focus();
          } else {
            this.passwordError = true;
            this.news2 = "请输入密码!";
            this.$refs.password.focus();
          }
          return;
        }
      } else {
        if (this.phone.length !== 11) {
          if (this.phone.length === 0) {
            this.news1 = "请输入手机号码";
          } else if (this.phone.length !== 11) {
            this.news1 = "手机格式错误";
          }
          this.phoneError = true;
          return;
        }
      }
      //添加登录成功后在localStorage记录登录用户的用户名，用于聊天室识别
      let usernameStorage = this.username;
      let keyName = "user" + this.username;
      localStorage.setItem(keyName, usernameStorage);
      //修改路由跳转 添加携带参数
      this.$router.push({
        path: "/map",
      });
    },
    // 更换登录方式
    changeWay() {
      // 消除切换时账号密码登录的错误信息
      if (this.flag === false) {
        this.usernameError = false;
        this.passwordError = false;
      } else {
        this.phoneError = false;
        this.messageNew = "发送验证码";
      }
      this.news1 = "";
      this.news2 = "";
      this.flag = !this.flag;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/iconfont/iconfont.css");
.login {
  position: absolute;
  z-index: 9999;
  right: 0;
  bottom: 0;
  transform: translate(-30%, -40%);
  width: 500px;
  height: 500px;
  // background-color: red;
  /* 内边距 */
  padding: 40px;
  /* 背景颜色 */
  background: rgba(37, 37, 37, 0.7);
  // background-color: rgb(101, 99, 99);
  /* 标准盒模型 */
  box-sizing: border-box;
  /* 设置盒子阴影 */
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  /* 边框圆角 */
  color: white;
  border-radius: 10px;

  // 动画区域
  &-password {
    .login-bc-hand {
      transform: translateX(42px) translateY(-15px) scale(0.7);
      &-r {
        transform: translateX(-42px) translateY(-15px) scale(0.7);
      }
    }
    .login-bc-arms-arm {
      transform: translateY(-40px) translateX(40px);
      &-r {
        transform: translateY(-40px) translateX(-40px) scaleX(-1);
      }
    }
  }

  &-bc {
    width: 200px;
    height: 108px;
    /* 背景图片 */
    background: url("../../assets/images/owl-login.png") no-repeat;
    /* 绝对定位 */
    position: absolute;
    top: -100px;
    /* 水平居中 */
    left: 50%;
    transform: translateX(-50%);

    &-hand {
      width: 34px;
      height: 34px;
      border-radius: 40px;
      background-color: #472d20;
      /* 绝对定位 */
      position: absolute;
      left: 12px;
      bottom: -8px;
      /* 沿Y轴缩放0.6倍（压扁） */
      transform: scaleY(0.6);
      /* 动画过渡 */
      transition: 0.3s ease-out;
      &-r {
        left: 170px;
      }
    }

    &-arms {
      position: absolute;
      top: 58px;
      width: 100%;
      height: 41px;
      overflow: hidden;

      &-arm {
        width: 40px;
        height: 65px;
        position: absolute;
        left: 20px;
        top: 40px;
        background: url("../../assets/images/owl-login-arm.png") no-repeat;
        transform: rotate(-20deg);
        transition: 0.3s ease-out;
        &-r {
          transform: rotate(20deg) scaleX(-1);
          left: 158px;
        }
      }
    }
  }

  form {
    .login-header {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 26px;
        font-weight: 700;
        margin-bottom: 20px;
      }
      ul {
        padding: 0;
        // background-color: #689ee9;
        display: flex;
        align-items: center;
        font-size: 12px;
        li {
          list-style: none;
          &:nth-child(2) {
            color: #59bce0;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }

    .login-input {
      /* 账号输入框相对定位 */
      position: relative;

      input {
        box-sizing: border-box;
        width: 100%;
        padding: 10px 0;
        font-size: 16px;
        color: #fff;
        // margin-bottom: 30px;
        /* 去掉所有边框 */
        border: none;
        /* 保留下边框 */
        border-bottom: 1px solid #fff;
        outline: none;
        /* 背景颜色透明 */
        margin-bottom: 30px;
        background: transparent;
      }

      &-message {
        box-sizing: border-box;
        width: 100%;
        display: flex;
        margin-top: 10px;
        input {
          margin-bottom: 20px;
          text-align: center;
          width: 60%;
          border: none;
          background-color: rgb(57, 55, 55);
        }
        button {
          width: 40%;
          font-size: 14px;
          height: 38px;
          color: #59bce0;
          background-color: rgb(224, 221, 217);
          border: 1px solid #59bce0;
          &:hover {
            cursor: pointer;
          }
        }
      }
      &-error {
        position: absolute;
        left: 0;
        top: 50px;
        width: 100%;
        height: 20px;
        text-align: right;
        color: rgb(236, 55, 55);
        font-size: 12px;
      }
      label,
      i {
        /* 绝对定位 */
        position: absolute;
        top: 0;
        /* 内边距 */
        padding: 10px 0;
        font-size: 16px;
        color: #fff;
      }

      label {
        pointer-events: none;
        /* 过度效果 */
        transition: 0.5s;
        left: 0;
      }

      i {
        right: 0;
      }

      input:focus ~ label,
      input:valid ~ label {
        /* 这里的效果时当鼠标放在输入框时,username 和 password会有一个位置的挪动 */
        top: -17px;
        left: 0;
        color: #59bce0;
        font-size: 12px;
      }
    }

    .login-remember {
      width: 100%;
      height: 40px;
      margin-bottom: 20px;
      // background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      &-check {
        display: flex;
        span {
          margin-left: 8px;
        }
      }
      &-message {
        color: #59bce0;
        cursor: pointer;
      }
    }

    .login-submit {
      margin-bottom: 20px;
      width: 100%;
      height: 40px;
      background-color: #59bce0;
      display: flex;
      transition: 0.5s;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: #b5d5de;
      border-radius: 5px;
      /* 鼠标移上去会有一个发光的效果 */
      &:hover {
        background: #59bce0;
        color: #fff;
        border-radius: 5px;
        /* 盒子阴影 */
        box-shadow: 0 0 5px #59bce0, 0 0 25px #59bce0, 0 0 50px #59bce0,
          0 0 100px #06003b;
      }
    }

    .login-forget {
      margin-bottom: 20px;
      font-size: 14px;
      color: #59bce0;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        cursor: pointer;
      }
    }

    // .login-breakline {
    //   display: flex;
    //   margin-bottom: 20px;
    //   align-items: center;
    //   justify-content: space-between;
    //   font-size: 12px;
    //   height: 20px;
    //   width: 100%;
    //   // background-color: red;
    //   position: relative;
    //   &::before {
    //     content: "";
    //     width: 35%;
    //     height: 1.5px;
    //     background-color: #fff;
    //   }
    //   &::after {
    //     content: "";
    //     width: 35%;
    //     height: 1.5px;
    //     background-color: #fff;
    //   }
    // }

    // .login-others {
    //   display: flex;
    //   align-items: center;
    //   justify-content: space-around;
    //   i {
    //     font-size: 24px;
    //     width: 45px;
    //     height: 45px;
    //     border-radius: 50%;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //     &:hover {
    //       cursor: pointer;
    //     }
    //     &:nth-child(1) {
    //       color: green;
    //       background-color: white;
    //     }
    //     &:nth-child(2) {
    //       color: white;
    //       background-color: #f67c2c;
    //     }
    //     &:nth-child(3) {
    //       color: white;
    //       background-color: #ea1b22;
    //     }
    //     &:nth-child(4) {
    //       color: black;
    //       background-color: white;
    //     }
    //     &:nth-child(5) {
    //       color: white;
    //       background-color: gainsboro;
    //     }
    //   }
    // }
  }
}
</style>
