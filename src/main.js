import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import animated from 'animate.css';

Vue.use(animated)

// import store from './store'

// 引入element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
