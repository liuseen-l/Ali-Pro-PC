
<template>
  <div class="map-center" id="map">
    <pre id="location">经纬度：{{lonlat}}</pre>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
export default {
  name: 'MapCenter',
  props: {
    msg: String,
  },
  data() {
    return {
      map: '',
      lonlat: '',
    };
  },
  mounted() {
    this.initMap();
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
      //去除mapbox logo
      this.map._logoControl && this.map.removeControl(this.map._logoControl);
      //获取鼠标位置，显示经纬度
      this.map.on('mousemove', (e) => {
        // eslint-disable-next-line no-unused-vars
        var location = this.map.queryRenderedFeatures(e.point);
        // this.lonlat= e.lngLat.lng.toFixed(4) +"," +e.lngLat.lat.toFixed(4)
        this.lonlat = 2134;
        // document.getElementById("location").innerHTML =
        //     "<p>" +
        //     e.lngLat.lng.toFixed(4) +
        //     "," +
        //     e.lngLat.lat.toFixed(4) +
        //     "</p>";
      });
      //点击地图获取坐标
      this.map.on('click', (e) => {
        const { lng, lat } = e.lngLat;

        console.log(lng, lat);
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
  // background-color: red;
}
#location {
  position: absolute;
  z-index: 1000;
  bottom: 50px;
  left: 25px;
  width: 100px;
  height: 20px;
  color: white;
}
</style>
