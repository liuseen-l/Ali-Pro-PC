/*
 * @Author: croy 
 * @Date: 2022-10-01 18:01:07
 * @LastEditors: croy 
 * @LastEditTime: 2022-10-01 22:57:16
 * @FilePath: /Ali-Pro-PC/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
import store from "./store/index.js"
import animated from 'animate.css'

Vue.use(animated)

Vue.use(store)
// import store from './store'

// 引入element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
