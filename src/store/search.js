export default {
  state: {
    searchInfo: {
      longitude: null, //经度
      latitude: null, //纬度
      address: '',
      adname: '',
      type: '',
    },
  },
  getters: {
    searchInfo(state) {
      return state.searchInfo;
    },
  },
  mutations: {
    SET_SEARCHIFO(state, data) {
      state.searchInfo = { ...state.searchInfo, ...data };
    },
  },
};
