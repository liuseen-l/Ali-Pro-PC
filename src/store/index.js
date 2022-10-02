/*
 * @Author: croy 
 * @Date: 2022-10-01 18:01:07
 * @LastEditors: croy 
 * @LastEditTime: 2022-10-02 20:20:12
 * @FilePath: /Ali-Pro-PC/src/store/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


import Vuex from 'vuex'

import Vue from 'vue'

Vue.use(Vuex)

import recommand from './recommand.js'

import chat from './chat.js'

export default new Vuex.Store({
  modules: {
    chat,
    recommand,
  },
})
