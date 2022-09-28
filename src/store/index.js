import Vuex from 'vuex'

import Vue from 'vue'

Vue.use(Vuex)

import extample from './example.js'


export default new Vuex.Store({
  modules:
  {
    extample
  }
})