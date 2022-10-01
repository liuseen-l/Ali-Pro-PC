export default {
  state: {
    count: 0,
  },
  // vuex的计算属性,当改变state中的count时，doubleCount随之变化
  getters: {
    doubleCount(state) {
      return state.count * 2 // 若把getters没有写在模块内，写在最外面return时需要加上模块名称
    },
  },
  mutations: {
    add(state) {
      state.count++
    },
    addBy(state, amount) {
      state.count += amount
    },
    decrease(state) {
      state.count--
    },
  },
  actions: {
    delayAdd(context) {
      setTimeout(() => {
        context.commit('add')
      }, 1000)
    },
  },
}
