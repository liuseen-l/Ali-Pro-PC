/*
 * @Author: croy 
 * @Date: 2022-10-01 18:01:07
 * @LastEditors: croy 
 * @LastEditTime: 2022-10-01 22:54:53
 * @FilePath: /Ali-Pro-PC/src/store/example.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


const state = {
  num: '1',
}

const actions = {
  setNum(context, data) {
    context.commit('setNum',data)
    console.log(data);
  },
}


const mutations = {
  setNum(state, data) {
    state.num = data
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}