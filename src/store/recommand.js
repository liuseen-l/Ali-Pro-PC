export default {
  state: {
    longitude: null, //经度
    latitude: null, //纬度
    count: 0,
    tab:1
  },
  getters: {
    currentLongitude(state) {
      return state.longitude
    },
    currentLatitude(state) {
      return state.latitude
    },
    Tab(state) {
      return state.tab
    },
  },
  mutations: {
    SET_LONGITUDE(state, longitude) {
      state.longitude = longitude
    },
    SET_LATITUDE(state, latitude) {
      state.latitude = latitude
    },
    SET_TAB(state, tab) {
      state.tab = tab
    },
  },
}
