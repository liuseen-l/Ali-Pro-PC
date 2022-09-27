//引入vue-router路由插件
import VueRouter from "vue-router";
//引入Vue
import Vue from "vue";
// 引入路由
import routes from "./routes";

Vue.use(VueRouter);

// 重写了一下 router 2个方法，防止操作不当页面直接挂掉，不影响正常操作
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => { },
      () => { }
    );
  }
};

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => { },
      () => { }
    );
  }
};

let router = new VueRouter({
  routes,
});

export default router;
