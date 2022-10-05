<template>
  <div class="footer">
    <!-- 其他登录 -->
    <div class="footer-breakline">其他方式登录</div>
    <!-- 其他登录标签 -->
    <div class="footer-others">
      <i class="iconfont icon-weixin"></i>
      <i class="iconfont icon-Gitlab-fill"></i>
      <i class="iconfont icon-QQ-circle-fill"></i>
      <i class="iconfont icon-github1"></i>
      <i class="iconfont icon-24gf-ellipsis"></i>
    </div>
    <div @click="toHomepage" class="back-to-home">返回首页</div>
  </div>
</template>

<script>
export default {
  name: "PersonFooter",
  methods: {
    // 前往注册页面
    toHomepage() {
      this.$router.push({
        path: "/map",
      });
    }
  }
};
</script>

<style lang="less" scoped>
.footer {
  width: 100%;
  &-breakline {
    display: flex;
    margin-bottom: 20px;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    height: 20px;
    width: 100%;
    // background-color: red;
    position: relative;
    &::before {
      content: "";
      width: 35%;
      height: 1.5px;
      background-color: #fff;
    }
    &::after {
      content: "";
      width: 35%;
      height: 1.5px;
      background-color: #fff;
    }
  }

  &-others {
    display: flex;
    align-items: center;
    justify-content: space-around;
    i {
      font-size: 24px;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        cursor: pointer;
      }
      &:nth-child(1) {
        color: green;
        background-color: white;
      }
      &:nth-child(2) {
        color: white;
        background-color: #f67c2c;
      }
      &:nth-child(3) {
        color: white;
        background-color: #ea1b22;
      }
      &:nth-child(4) {
        color: black;
        background-color: white;
      }
      &:nth-child(5) {
        color: white;
        background-color: gainsboro;
      }
    }
  }

  .back-to-home {
    margin-top: 10px;
    font-size: 14px;
    color: #59bce0;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
