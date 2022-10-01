export default {
  state: {
    longitude: null, //经度
    latitude: null, //纬度
    count: 0,
  },
  getters: {
    currentLongitude(state) {
      return state.longitude
    },
    currentLatitude(state) {
      return state.latitude
    },
  },
  mutations: {
    SET_LONGITUDE(state, longitude) {
      state.longitude = longitude
    },
    SET_LATITUDE(state, latitude) {
      state.latitude = latitude
    },
  },
}
