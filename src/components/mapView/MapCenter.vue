<template>
  <div class="map-center" id="map">
    <pre id="location">经纬度：{{ mouseLon + "," + mouseLat }}</pre>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import { tSObjectKeyword } from '@babel/types';
export default {
  name: 'MapCenter',
  props: {
    msg: String,
  },
  data() {
    return {
      map: '', //地图
      lon: '120', //用户经度
      lat: '36', //用户纬度
      mouseLon: '120', //鼠标经度
      mouseLat: '36', //鼠标纬度
    };
  },
  mounted() {
    this.initMap();

    this.locationFn()
      .then((res) => {
        // setTimeout(function(){alert("shjs")},1000)
        this.flyToPosition(this.lon, this.lat);
        this.$store.commit('SET_LONGITUDE', this.lon);
        this.$store.commit('SET_LATITUDE', this.lat);
      })
      .catch((err) => {
        alert('位置信息获取失败');
      });
  },
  methods: {
    //初始化地图
    initMap: function () {
      // let that = this;
      mapboxgl.accessToken =
        'pk.eyJ1Ijoiemh1cWlxaTEyMyIsImEiOiJjbDZwdThzOTkwNzd6M2JvODd4eXN0NXdrIn0.G6_v-vFX1Atl8tHwkKLLFQ';
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/zhuqiqi123/cl8k6g97m000b14mnjt8341ig',
        center: [120.116, 36],
        // center: [116.34, 39.88],
        zoom: 2,
        // pitch: 60, //地图的角度，不写默认是0，取值是0-60度
        // bearing: -17.6, //地图的初始方向，值是北的逆时针度数，默认是0，即是正北
        antialias: true, ////抗锯齿，通过false关闭提升性能
        attributionControl: false,
      });
      // //设置中文
      mapboxgl.setRTLTextPlugin(
        'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js'
      );
      this.map.addControl(
        new MapboxLanguage({
          defaultLanguage: 'zh-Hans',
        })
      );
      //加入缩放控件
      var nav = new mapboxgl.NavigationControl();
      this.map.addControl(nav, 'top-left');
      // //去除mapbox logo
      // this.map._logoControl &&
      //     this.map.removeControl(this.map._logoControl);
      //获取鼠标位置，显示经纬度
      this.map.on('mousemove', (e) => {
        var location = this.map.queryRenderedFeatures(e.point);
        // this.lonlat= e.lngLat.lng.toFixed(4) +"," +e.lngLat.lat.toFixed(4)
        this.lonlat = 2134;
        this.mouseLon = e.lngLat.lng.toFixed(4);
        this.mouseLat = e.lngLat.lat.toFixed(4);
      });
      //点击地图获取坐标
      this.map.on('click', (e) => {
        const { lng, lat } = e.lngLat;
        console.log(lng, lat);
        this.$store.commit('SET_LONGITUDE', lng);
        this.$store.commit('SET_LATITUDE', lat);
      });
      var scale = new mapboxgl.ScaleControl({
        maxWidth: 100,
        unit: 'metric',
      });
      this.map.addControl(scale, 'bottom-left');
    },

    //获取位置信息异步函数
    locationFn() {
      let that = this;
      return new Promise(function (res, err) {
        //获取位置信息失败的回调函数
        function showError(error) {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert('定位失败,用户拒绝请求地理定位');
              err();
              break;
            case error.POSITION_UNAVAILABLE:
              alert('定位失败,位置信息是不可用');
              err();
              break;
            case error.TIMEOUT:
              alert('定位失败,请求获取用户位置超时');
              err();
              break;
            case error.UNKNOWN_ERROR:
              alert('定位失败,定位系统失效');
              err();
              break;
          }
        }

        //获取位置信息成功的回调函数
        function showPosition(position) {
          that.lat = position.coords.latitude;
          that.lon = position.coords.longitude;
          res();
        }

        //获取位置信息
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition, showError, {
            enableHighAccuracy: true,
          });
        } else {
          alert('浏览器不支持地理定位。');
          err();
        }
      });
    },
    flyToPosition(lon, lat) {
      this.map.flyTo({
        center: [this.lon, this.lat], // 中心点
        zoom: 16.5, // 缩放比例
        pitch: 45, // 倾斜度
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import 'mapbox-gl/dist/mapbox-gl.css';
.map-center {
  width: 100%;
  height: 100%;
}
#location {
  position: absolute;
  z-index: 1000;
  bottom: 40px;
  left: 15px;
  width: 100px;
  height: 20px;
  color: white;
}
// .mapboxgl-ctrl.mapboxgl-ctrl-scale {
// 	height: 10px;
// 	background-color:transparent;
// 	line-height:10%;
// 	text-align:center
// }

// 1.node_modules/mapbox-gl/dist/mapbox-gl.css
// 2.mapboxgl-ctrl-logo，display:none
</style>
